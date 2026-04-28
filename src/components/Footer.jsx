import React from "react";
import stackedLogo from "../assets/bingeboxstackedlogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer__content">
        <a href="#">
          <figure className="footer__logo--wrapper">
            <img src={stackedLogo} className="footer__logo" alt="" />
          </figure>
        </a>
        <div className="footer__links">
          <Link to="/" className="footer__link link__hover-effect">
            Home
          </Link>
          <Link to="/browse" className="footer__link link__hover-effect">
            Browse
          </Link>
          <Link to="#" className="footer__link link__hover-effect no-click">
            Trending
          </Link>
          <Link to="/" className="footer__link link__hover-effect no-click">
            Contact
          </Link>
        </div>
        <p className="footer__para">Copyright © Shavonne Whiffin 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
