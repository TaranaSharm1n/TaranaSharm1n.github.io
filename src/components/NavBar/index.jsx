import { Link } from "react-router-dom";
import "./index.css";

function NavBar() {
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
    <nav className="navbar">
      <Link
        to="/"
        className="navbar-name"
        onClick={scrollToTop}
      >
        Tarana
      </Link>

      <div className="navbar-links">
        <Link to="/" onClick={scrollToTop}>
          Home
        </Link>

        <Link to="/" onClick={() => scrollToSection("projects")}>
          Work
        </Link>

        <Link to="/" onClick={() => scrollToSection("about")}>
          About
        </Link>

        <Link to="/" onClick={() => scrollToSection("contact")}>
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;