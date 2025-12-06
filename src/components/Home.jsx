import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import HomeImage from "../assets/Heros/PRA_0339.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  const [category, setCategory] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const weddings = Object.values(
    import.meta.glob("../../optimized/HomeWedding/*.{jpg,jpeg,png,webp}", {
      eager: true,
    })
  ).map((img) => img.default);
  const maternity = Object.values(
    import.meta.glob("../../optimized/meternity/*.{jpg,jpeg,png}", {
      eager: true,
    })
  ).map((img) => img.default);
  const creative = Object.values(
    import.meta.glob("../../optimized/creative/*.{jpg,jpeg,png}", {
      eager: true,
    })
  ).map((img) => img.default);

  const newborn = Object.values(
    import.meta.glob("../../optimized/home-new-born/*.{jpg,jpeg,png}", {
      eager: true,
    })
  ).map((img) => img.default);

  const navigate = useNavigate();

  const LazyImage = ({ src, alt }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
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
            src={src}
            alt={alt}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        ) : (
          <p style={{ textAlign: "center", paddingTop: "80px" }}>Loading...</p>
        )}
      </div>
    );
  };

  // const getImages = () => {
  //   switch (category) {
  //     case "weddings":
  //       return weddings;
  //     case "Maternity":
  //       return maternity;
  //     case "creative":
  //       return creative;
  //     case "Newborn":
  //       return newborn;
  //     default:
  //       return allWorks;
  //   }
  // };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = (img, cat) => {
    setSelectedImage(img);
    setSelectedCategory(cat);
    setModalOpen(true);
  };

  const handleExplore = () => {
    let route = "/";
    switch (selectedCategory) {
      case "creative":
        route = "/creative";
        break;
      case "Maternity":
        route = "/maternity";
        break;
      case "weddings":
        route = "/weddings";
        break;
      case "Newborn":
        route = "/newborn";
        break;
      default:
        route = "/";
    }
    navigate(route);
    closeModal();
  };
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const combined = [
      ...maternity.map((img) => ({ img, cat: "Maternity" })),
      ...newborn.map((img) => ({ img, cat: "Newborn" })),
      ...creative.map((img) => ({ img, cat: "creative" })),
      ...weddings.map((img) => ({ img, cat: "weddings" })),
    ];
    const shuffled = [...combined].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="Hero">
          <div className="firstImage">
            <img src={HomeImage} alt="" />
            <div className="heroText">
              <h1>Welcome to Baby Photo Studio</h1>
              <p>Capturing beautiful moments forever</p>
              <a href="/contact-us" className="contact-btn">
                Contact Now
              </a>
            </div>
          </div>
        </div>
        <div className="home-serives">
          <div className="Service-section">
            <div className="head">
              <div className="head-content">
                <h1>What We Do</h1>
                <p>
                  Explore our diverse collection of photography work across
                  different specialties
                </p>
              </div>
            </div>
            <div className="specialties">
              <button
                className={`specialities-btn ${
                  category === "creative" ? "active" : ""
                }`}
                onClick={() => setCategory("creative")}
              >
                Baby's
              </button>
              <button
                className={`specialities-btn ${
                  category === "Newborn" ? "active" : ""
                }`}
                onClick={() => setCategory("Newborn")}
              >
                NewBorn
              </button>
              <button
                className={`specialities-btn ${
                  category === "all" ? "active" : ""
                }`}
                onClick={() => setCategory("all")}
              >
                All Work
              </button>
              <button
                className={`specialities-btn ${
                  category === "weddings" ? "active" : ""
                }`}
                onClick={() => setCategory("weddings")}
              >
                Weddings
              </button>
              <button
                className={`specialities-btn ${
                  category === "Maternity" ? "active" : ""
                }`}
                onClick={() => setCategory("Maternity")}
              >
                Maternity
              </button>
            </div>
          </div>
        </div>

        <div className="gallery" id="our-work">
          {(() => {
            const combined = [
              ...maternity.map((img) => ({ img, cat: "Maternity" })),
              ...newborn.map((img) => ({ img, cat: "Newborn" })),
              ...creative.map((img) => ({ img, cat: "creative" })),
              ...weddings.map((img) => ({ img, cat: "weddings" })),
            ];

            if (category === "all") {
              return shuffledImages.slice(0, 25).map(({ img, cat }, index) => (
                <div
                  className="gallery-item"
                  key={index}
                  onClick={() => openModal(img, cat)}
                >
                  <LazyImage src={img} alt={`work-${cat}-${index}`} />
                  {/* <div className="overlay">
                    <span>View More</span>
                  </div> */}
                </div>
              ));
            }

            return combined
              .filter(({ cat }) => cat === category)
              .map(({ img, cat }, index) => (
                <div
                  className="gallery-item"
                  key={index}
                  onClick={() => openModal(img, cat)}
                >
                  <LazyImage src={img} alt={`work-${cat}-${index}`} />
                </div>
              ));
          })()}
        </div>

        {isModalOpen && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                ✖
              </button>
              <img
                src={selectedImage}
                alt="Selected Work"
                className="modal-img"
              />
              <button className="explore-btn" onClick={handleExplore}>
                Explore This Theme
              </button>
            </div>
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}

export default Home;
