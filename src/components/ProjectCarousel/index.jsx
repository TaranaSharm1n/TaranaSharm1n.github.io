import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCards } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./index.css";

import lineByLineCard from "../../assets/tempAssets/LBL_PostCard.png";
import llmCard from "../../assets/tempAssets/LLM_PostCard.png";
import silentShoreCard from "../../assets/tempAssets/SilentShore_PostCard.png";

const projects = [
  {
    id: "line-by-line",
    card: lineByLineCard,
    title: "Line by Line — UI Engineer",
    description:
      "A third-person detective game that combines crossword puzzles with investigative gameplay. I developed responsive UI systems, including the main menu, audio controls, and journal notifications, while collaborating with a multidisciplinary team.",
    skills: ["Unity", "C#", "UI Engineering", "UX Design"],
  },
  {
    id: "large-language-mimic",
    card: llmCard,
    title: "Large Language Mimic — Engineer",
    description:
      "A narrative satire where players complete timed minigames as a human pretending to be AI while navigating an increasingly unethical political campaign. I developed two core minigames featuring document redaction, dynamic movement, timed objectives, and progressive difficulty.",
    skills: ["Unity", "C#", "Gameplay Programming", "Systems Design"],
  },
  {
    id: "silent-shore",
    card: silentShoreCard,
    title: "Silent Shore — Game & UI/UX Design Lead",
    description:
      "A cooperative card-based board game where players gather fuel while escaping a sentient fog. I led the game and UI/UX design, creating the core mechanics, interface, and pitch with a four-person team.",
    skills: ["Game Design", "UI/UX Design", "Figma", "Rapid Prototyping"],
  },
];

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = projects[activeIndex];

  const handleOpenProject = (projectId) => {
    document.getElementById(projectId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="projects-showcase">
      <div className="postcard-carousel">
        <Swiper
          effect="cards"
          allowTouchMove={false}
          grabCursor={false}
          modules={[EffectCards, Navigation, Pagination]}
          navigation={{
            prevEl: ".carousel-arrow-left",
            nextEl: ".carousel-arrow-right",
          }}
          pagination={{ clickable: true, el: ".carousel-dots" }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="postcard-swiper"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="postcard-slide">
              <img
                src={project.card}
                className="postcard-image"
                alt={project.title}
                onClick={() => handleOpenProject(project.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="carousel-arrow-left" aria-label="Previous project">
          ‹
        </button>
        <button className="carousel-arrow-right" aria-label="Next project">
          ›
        </button>
        <div className="carousel-dots" />
      </div>

      <div className="project-details-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="project-details-panel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h3>Details</h3>
            <p>{current.description}</p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + "-skills"}
            className="project-skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {current.skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProjectCarousel;