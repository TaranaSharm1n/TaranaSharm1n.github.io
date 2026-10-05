import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

import resumePdf from "../../assets/tempAssets/Tarana-Sharmin-Resume.pdf";
import "./index.css";

import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer-left">
        <Link
          to="/"
          className="footer-name"
          onClick={scrollToTop}
        >
          <span className="footer-plane">✈</span>
          Tarana Sharmin
        </Link>

        <nav
          className="footer-navigation"
          aria-label="Footer navigation"
        >
          <Link to="/" onClick={scrollToTop}>
            Home
          </Link>

          <Link
            to="/"
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </Link>

          <Link
            to="/"
            onClick={() => scrollToSection("about")}
          >
            About
          </Link>
        </nav>
      </div>

      <div className="footer-socials">
        <a
          href="linkedin.com/in/tarana-sharmin"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit my LinkedIn"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://www.instagram.com/rave1ty/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit my Instagram"
        >
          <FaInstagram />
        </a>

        <a
          href="mailto:TaranaSharmin07@gmail.com"
          aria-label="Email me"
        >
          <FaEnvelope />
        </a>

        <a
          href={resumePdf}
          className="footer-resume"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </div>
    </footer>
  );
}

export default Footer;