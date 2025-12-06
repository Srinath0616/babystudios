import React from "react";
import Navbar from "./Navbar";
import HomeImage from "../assets/Heros/02.jpg";
import "./Maternity.css";
import { FaHandPointRight } from "react-icons/fa";
import MaternityTheme from '../assets/Heros/15.jpg'
import Footer from "./Footer";


const Maternity = () => {
  return (
    <>
      <Navbar />
      <div className="Hero">
        <div className="firstImage">
          <img src={HomeImage} alt="Creative" />
          <div className="heroText">
            <h1>Embracing the Beauty of Motherhood</h1>
            <p>
              Every heartbeat, every glow — we capture the magic of life before
              it begins.
            </p>
            <a href="/contact-us" className="contact-btn">
              Book Your Maternity Shoot
            </a>
          </div>
        </div>
      </div>
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
                  2–3 outfit changes or themes Access to premium maternity
              </p>

              <p className="para">
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                  styling (on request) Choice of indoor or outdoor location
              
              </p>

              <p className="para">
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                  wardrobe High-resolution edited photos Optional makeup & hair
              
              </p>
              <p className="para">            
                  <span>
                    <FaHandPointRight className="point-icon" />
                  </span>
                Printed albums and framed photos available
              
              </p>
            </div>
            <div className="right-side">
              <img src={MaternityTheme} alt="" />
              
            </div>
          </div>
        </div>
        
      <Footer />
      </div>
      
    </>
  );
};

export default Maternity;
