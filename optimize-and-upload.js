// optimize-and-upload.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import fg from "fast-glob";
import sharp from "sharp";
import cloudinary from "cloudinary";

dotenv.config();

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  LOCAL_PHOTOS_DIR,
  OPTIMIZED_DIR,
  OUTPUT_DIR,
  SKIP_EXISTING
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Cloudinary credentials missing in .env");
  process.exit(1);
}

if (!LOCAL_PHOTOS_DIR) {
  console.error("LOCAL_PHOTOS_DIR missing in .env");
  process.exit(1);
}

const localRoot = path.resolve(LOCAL_PHOTOS_DIR);
const optimizedRoot = path.resolve(OPTIMIZED_DIR || path.join(process.cwd(), "optimized"));
const outRoot = path.resolve(OUTPUT_DIR || path.join(process.cwd(), "public/assets"));

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function makeSlug(s) {
  return s.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase();
}

async function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

async function existsOnCloud(publicId) {
  try {
    const res = await cloudinary.v2.api.resource(publicId);
    return !!res;
  } catch (err) {
    return false;
  }
}

function cloudinaryVariant(publicId, format, width) {
  const encoded = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},q_auto,f_auto/${encoded}.${format}`;
}

async function optimizeImage(inputPath, outputPath) {
  // create parent dir
  await ensureDir(path.dirname(outputPath));

  const image = sharp(inputPath);
  const meta = await image.metadata();

  // If width larger than 3000, resize. Otherwise keep original dimensions but re-encode.
  const pipeline = meta.width && meta.width > 3000 ? image.resize({ width: 3000 }) : image;

  // write JPEG optimized + WebP variant
  const jpegOut = outputPath.replace(/\.[^.]+$/, ".jpg");
  const webpOut = outputPath.replace(/\.[^.]+$/, ".webp");

  await pipeline
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(jpegOut);

  await pipeline
    .webp({ quality: 80 })
    .toFile(webpOut);

  return { jpeg: jpegOut, webp: webpOut };
}

async function main() {
  console.log("Scanning:", localRoot);
  const patterns = ["**/*.{jpg,jpeg,png,webp,HEIC,heic,JPG,JPEG,PNG,WEBP}"];
  const entries = await fg(patterns, { cwd: localRoot, onlyFiles: true, caseSensitiveMatch: false });
  console.log("Found", entries.length, "files.");

  const manifest = {};

  for (const rel of entries) {
    try {
      const abs = path.join(localRoot, rel);
      const parts = rel.split(/[\\/]/);
      const category = parts.length > 1 ? parts[0] : "uncategorized";
      const slug = makeSlug(category);
      const fileName = path.basename(rel, path.extname(rel));
      const optimizedRel = path.join(slug, `${makeSlug(fileName)}.jpg`);
      const optimizedAbs = path.join(optimizedRoot, optimizedRel);

      // optimize
      console.log("Optimizing:", rel);
      const { jpeg, webp } = await optimizeImage(abs, optimizedAbs);

      // Upload optimized JPEG to Cloudinary (use slug folder)
      const publicId = `${slug}/${makeSlug(fileName)}`;

      if (SKIP_EXISTING === "true") {
        const exists = await existsOnCloud(publicId);
        if (exists) {
          console.log("Skipping upload (exists):", publicId);
          // still add to manifest using publicId
          const format = "jpg";
          const item = {
            public_id: publicId,
            format,
            original: cloudinaryVariant(publicId, format, 1600),
            variants: {
              "400": cloudinaryVariant(publicId, format, 400),
              "800": cloudinaryVariant(publicId, format, 800),
              "1200": cloudinaryVariant(publicId, format, 1200)
            }
          };
          manifest[slug] ??= { category, slug, images: [] };
          manifest[slug].images.push(item);
          continue;
        }
      }

      console.log("Uploading optimized jpeg:", jpeg);
      const res = await cloudinary.v2.uploader.upload(jpeg, {
        public_id: publicId,
        folder: slug,
        use_filename: false,
        unique_filename: false,
        overwrite: false,
      });

      const format = res.format || "jpg";
      const item = {
        public_id: res.public_id,
        format,
        original: res.secure_url,
        variants: {
          "400": cloudinaryVariant(res.public_id, format, 400),
          "800": cloudinaryVariant(res.public_id, format, 800),
          "1200": cloudinaryVariant(res.public_id, format, 1200),
        }
      };

      manifest[slug] ??= { category, slug, images: [] };
      manifest[slug].images.push(item);

      // small pause
      await new Promise((r) => setTimeout(r, 120));
    } catch (err) {
      console.error("Error processing", rel, err.message || err);
    }
  }

  // write manifest
  await ensureDir(outRoot);
  const outPath = path.join(outRoot, "photos_index.json");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), "utf-8");
  console.log("Manifest written to:", outPath);
  console.log("Optimized files are in:", optimizedRoot);
  console.log("Done.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
