import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import logo from '../../../assets/img/logo.png';
import "./footer.css";

function Footer() {
  return (
    <div>
      <section className="footer bg-success">
        <div className="container pt-5">
          <div className="row py-3">
            <div className="col-xl-3 col-md-6 py-3 text-center">
              <img
                src={logo}
                alt="logo"
                className="w-75 img-fluid"
              />
              <div className="d-flex mt-5">
                <a
                  href="#"
                  className="text-decoration-none text-white-50 w-25 fs-3 text-center"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-decoration-none text-white-50 w-25 fs-3 text-center"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="text-decoration-none text-white-50 w-25 fs-3 text-center"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className="text-decoration-none text-white-50 w-25 fs-3 text-center"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 py-3">
              <h5 className="text-white">About Us</h5>
              <div className="ps-1 py-1">
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    About Us
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    Contact Us
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    Careers
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    Customer Support
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 py-3">
              <h5 className="text-white">Categories</h5>
              <div className="ps-1 py-1">
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    FAQ
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    License
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    Privacy policy
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    Certificates of Quality
                  </span>
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 py-3">
              <h5 className="text-white">Information</h5>
              <div className="ps-1 py-1">
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    FAQs
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    Refund Policy
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    Privacy Policy
                  </span>
                </a>
                <a href="#" className="text-decoration-none d-block py-2">
                  <span className="footer-link p-text text-white opacity-75">
                    Terms & Conditions
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="text-white py-5 footer-info px-3 text-center">
            <p className="m-0 py-2 opacity-75">
              Copyright © 2023 Office Furniture Store
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
