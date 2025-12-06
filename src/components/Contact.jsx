import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeImage from "../assets/1 Newborn Com/02/52.jpg";
import "./Contact.css";
import profile from "../assets/AboutUs/Photographer.jpg";
import whatsapp from "../assets/AboutUs/whatsapp.png";
import call from "../assets/AboutUs/call.png";

// const handleSubmit = () => {};

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="Hero">
          <div className="firstImage">
            <img className="contact-hero" src={HomeImage} alt="Creative" />
            <div className="overlay"></div>
            <div className="heroText">
              <h1 className="contact-text">Contact Us</h1>
              <p className="contact-subtext">
               With over 25 years of expertise, we capture emotions that speak beyond words.
              </p>
              <a href="tel:+919347370223" className="contact-btn">
                Let’s Connect →
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <div className="form-left">
            <div className="whatsapp">
              <h1>WhatsApp</h1>
              <p>Send us a message, we'll keep in touch with you.</p>
              <a href="https://api.whatsapp.com/send?phone=+9347370223&text=Hello%20Baby%20Studio">
                <img src={whatsapp} alt="Whatsapp" />
              </a>
            </div>
            <div className="call">
              <h1>Call Us</h1>
              <p>
                {" "}
                <i>
                  <b>+91-94906 85458</b>
                </i>{" "}
                to start your Journey with Us
              </p>
              <a href="tel:+919490685458">
                <img src={call} alt="Call Us" />
              </a>
            </div>
          </div>
          <div className="form-right">
            <img src={profile} alt="" />
            <h2>Prashanth Muhurtham</h2>
          </div>
        </div>
        {/* <form action="" onSubmit={handleSubmit}></form> */}
      </div>
      <Footer />
    </>
  );
};

export default Contact;
