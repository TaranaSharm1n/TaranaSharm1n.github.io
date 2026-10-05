import "./index.css";
import { useEffect } from "react";

import BoardingPass from "../../components/BoardingPass";
import PlaneScenes from "../PlaneScenes";
import About from "../About";
import ProjectCarousel from "../../components/ProjectCarousel";
import Footer from "../../components/Footer";

function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const smoothScrollTo = (targetId, duration = 1200) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * eased);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleTear = () => {
    smoothScrollTo("plane-scenes", 1220);
  };

  return (
    <>
      <section className="screen-1">
        <BoardingPass onTear={handleTear} />
      </section>

      <PlaneScenes />

      <section id="about">
        <About />
      </section>

      <section id="projects" className="projects-section">
      <header className="projects-hero">
      <h2>My Work</h2>
      </header>
      <ProjectCarousel />
      </section>

      <Footer />
    </>
  );
}

export default LandingPage;
