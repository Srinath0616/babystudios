import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeImage from "../assets/Heros/B 56.jpg";
import { FaHandPointRight } from "react-icons/fa";
import NewbornImg from '../assets/Heros/70.jpg'
const Newborn = () => {
  return (
    <>
      <Navbar />
      <div className="Hero">
        <div className="firstImage">
          <img src={HomeImage} alt="Creative" />
          <div className="heroText">
            <h1>Tiny Moments, Big Memories.</h1>
            <p>
              Every giggle, every stretch — we preserve the beauty of your
              baby’s earliest days with love and care.
            </p>

            <a href="/contact-us" className="contact-btn">
              Book Your Baby's Shoot
            </a>
          </div>
        </div>
      </div>
      <div className="Newborn">
        <div className="Maternity">
          <div className="Service-section">
            <div className="head">
              <div className="head-content">
                <h1>Maternity Theme</h1>
                <p>
                  Discover creative maternity shoots — from dreamy floral setups
                  to nature's serenity and elegant indoor frames.
                </p>
              </div>
            </div>
            <div className="offerings-sections">
              <div className="text-side">
                <h1>What We Offer</h1>
                <p className="para">
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                  2–3 outfit changes or themes
                </p>

                <p className="para">
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                  Access to premium maternity wardrobe
                </p>

                <p className="para">
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                  High-resolution edited photos
                </p>
                <p className="para">
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                  Optional makeup & hair styling (on request)
                </p>
                <p className="para">
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                  Choice of indoor or outdoor location
                </p>
                <p className="para">
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                  Printed albums and framed photos available
                </p>
              </div>
              <div className="right-side">
                <img src={NewbornImg} alt="New Born Image" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Newborn;
