import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <h2>Baby Photo Studio</h2>
          <p>
            We capture the joy of your life’s most precious moments — 
            from newborn smiles to family celebrations, with creativity and care.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/creative">Creative</a></li>
            <li><a href="/maternity">Maternity</a></li>
            {/* <li><a href="/weddings">Weddings</a></li> */}
            <li><a href="/contact-us">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Reach Us</h3>
          <p><FaMapMarkerAlt /><a href="https://maps.google.com/maps?ll=17.546896,78.482647&z=14&t=m&hl=en&gl=IN&mapclient=embed&cid=16511930197701573434" className="mail">Kompally, Hyderabad, India</a></p>
          <p><FaPhoneAlt /><a href="tel:+91 93473 70223" className="mail"> +91 93473 70223</a></p>
          <p><FaEnvelope /><a href="mailto:photoprashanth@gmail.com" className="mail"> photoprashanth@gmail.com</a> </p>

          <div className="footer-socials">
            <a href="https://www.facebook.com/prashanth.brahmakanti"><FaFacebookF /></a>
            <a href="https://www.instagram.com/babystudiokompally/"><FaInstagram /></a>
            <a href="https://www.youtube.com/@muhurtham.photography8461"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-map">
        <iframe
          title="studio-location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7608.34819143483!2d78.482647!3d17.546896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8584ddefbabf%3A0xe5262907e60c3b3a!2sBaby%20Studio%20KOMPALLY%20Hyderabad!5e0!3m2!1sen!2sin!4v1761335690464!5m2!1sen!2sin"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "12px", marginTop: "25px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Baby Photo Studio. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
