import dotenv from "dotenv";
import cloudinary from "cloudinary";
import fs from "fs";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function fetchFolder(folderName) {
  const resources = await cloudinary.v2.search
    .expression(`folder="${folderName}"`)
    .max_results(500)
    .execute();

  return resources.resources.map((r) => ({
    public_id: r.public_id,
    url: r.secure_url,
    width: r.width,
    height: r.height,
    format: r.format
  }));
}

async function main() {
  const folders = [
    "Studio 1 Y Themes/07 Christmas",
    "Studio 1 Y Themes/15 Army",
    "Studio 1 Y Themes/16 Beeach",
    "Studio 1 Y Themes/20 Radha Krishna"
  ];

  const manifest = {};

  for (const folder of folders) {
    const slug = folder.split("/").pop().replace(/\s+/g, "-").toLowerCase();
    manifest[slug] = {
      category: slug,
      folder,
      images: await fetchFolder(folder)
    };
  }

  fs.writeFileSync(
    "./public/photos_index.json",
    JSON.stringify(manifest, null, 2)
  );

  console.log("photos_index.json created");
}

main();
