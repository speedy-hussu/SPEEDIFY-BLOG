import React from "react";
import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <footer>
      <div className="foo-author-name">
        <h2>Made by speedy</h2>
      </div>
      <div className="foo-links">
        <a href="#" target="blank" className="foo-link insta">
          <FaInstagram />
          Instagram
        </a>
        <a href="#" target="blank" className="foo-link facebook">
          <FaFacebook /> facebook
        </a>
        <a href="#" target="blank" className="foo-link linkedin">
          <FaLinkedin style={{ fontSize: "19px" }} /> LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
