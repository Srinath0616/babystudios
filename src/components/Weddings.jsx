// Weddings.jsx
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import HomeImage from "../../optimized/HomeWedding/1t3a5538.webp";
import "./Weddings.css";
import Footer from "./Footer";

const CLOUD_NAME = "dwwfhnjjo";
const PUBLIC_MANIFEST_PATH = "/assets/photos_index.json";


const Weddings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [theme, setTheme] = useState("all");
  const [shuffledImages, setShuffledImages] = useState([]);

  const cloudinaryUrlFor = (publicId, format, width) => {
    if (!publicId) return "";
    const encoded = publicId.split("/").map(encodeURIComponent).join("/");
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},q_auto,f_auto/${encoded}.${format}`;
  };

  const slugToTheme = (slug, folder) => {
    const s = (slug || folder || "").toLowerCase();
    if (s.includes("engagement") || s.includes("engage")) return "engagement";
    if (s.includes("pre") || s.includes("pree")) return "pree-shoot";
    if (s.includes("bride")) return "wedding-bride";
    if (s.includes("reception")) return "reception";
    if (s.includes("wedding") || s.includes("marriage")) return "wedding";
    return "other";
  };

  const LazyImage = ({ src400, src800, src1200, alt }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef();
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      if (imgRef.current) observer.observe(imgRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={imgRef}
        style={{
          minHeight: "200px",
          background: "#f5f5f5",
          marginBottom: "10px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {isVisible ? (
          <img
            src={src800 || src400}
            srcSet={
              (src400 ? `${src400} 400w, ` : "") +
              (src800 ? `${src800} 800w, ` : "") +
              (src1200 ? `${src1200} 1200w` : "")
            }
            alt={alt}
            loading="lazy"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        ) : (
          <p style={{ textAlign: "center", paddingTop: "80px" }}>Loading...</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(PUBLIC_MANIFEST_PATH);
        if (!res.ok) {
          console.warn("Manifest NOT found");
          return;
        }

        const manifest = await res.json();

        const cloudEntries = Object.entries(manifest).flatMap(([slug, catObj]) => {
          const cat = slugToTheme(slug, catObj.folder);
          return (catObj.images || []).map((img) => {
            const publicId = img.public_id || "";
            const format = img.format || "jpg";
            return {
              img400: cloudinaryUrlFor(publicId, format, 400),
              img800: cloudinaryUrlFor(publicId, format, 800),
              img1200: cloudinaryUrlFor(publicId, format, 1200),
              original: cloudinaryUrlFor(publicId, format, 1600),
              cat,
              alt: img.public_id || "",
            };
          });
        });

        if (!mounted) return;

        const shuffled = [...cloudEntries].sort(() => Math.random() - 0.5);
        setShuffledImages(shuffled);
      } catch (err) {
        console.error("Failed fetching manifest:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const renderGallery = () => {
    const filtered =
      theme === "all"
        ? shuffledImages.slice(0, 35)
        : shuffledImages.filter((i) => i.cat === theme);

    return filtered.map((item, index) => (
      <div className="gallery-item" key={index} onClick={() => openModal(item)}>
        <LazyImage
          src400={item.img400}
          src800={item.img800}
          src1200={item.img1200}
          alt={`img-${index}`}
        />
      </div>
    ));
  };

  return (
    <>
      <Navbar />

      <div className="Hero">
        <div className="firstImage">
          <img src={HomeImage} alt="Wedding Hero" />
          <div className="heroText">
            <h1>Celebrate Love. Forever.</h1>
            <p>Engagements, Pre-Weddings, Weddings & Receptions.</p>
            <a href="/contact-us" className="contact-btn">Book Your Event</a>
          </div>
        </div>
      </div>

      <div className="home-serives">
        <div className="Service-section">
          <div className="head">
            <div className="head-content">
              <h1>Wedding Collections</h1>
              <p>Browse categories below.</p>
            </div>
          </div>

          <div className="specialties">
            <button className={`specialities-btn ${theme === "all" ? "active" : ""}`} onClick={() => setTheme("all")}>
              All
            </button>
            <button className={`specialities-btn ${theme === "engagement" ? "active" : ""}`} onClick={() => setTheme("engagement")}>
              Engagement
            </button>
            <button className={`specialities-btn ${theme === "pree-shoot" ? "active" : ""}`} onClick={() => setTheme("pree-shoot")}>
              Pre Wedding
            </button>
            <button className={`specialities-btn ${theme === "wedding-bride" ? "active" : ""}`} onClick={() => setTheme("wedding-bride")}>
              Wedding Bride
            </button>
            <button className={`specialities-btn ${theme === "wedding" ? "active" : ""}`} onClick={() => setTheme("wedding")}>
              Wedding
            </button>
            <button className={`specialities-btn ${theme === "reception" ? "active" : ""}`} onClick={() => setTheme("reception")}>
              Reception
            </button>
          </div>
        </div>
      </div>

      <div className="gallery">{renderGallery()}</div>

      {isModalOpen && selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            <img
              src={selectedImage.original}
              alt="Selected Wedding"
              className="modal-img"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Weddings;
