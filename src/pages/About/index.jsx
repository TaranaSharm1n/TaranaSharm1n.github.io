import './index.css'
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

import portraitImg from "../../assets/tempAssets/PassportBetter.png";
import galleryImg1 from "../../assets/tempAssets/poloroid1.png";
import galleryImg2 from "../../assets/tempAssets/poloroid2.png";
import galleryImg3 from "../../assets/tempAssets/poloroid3.png";

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

function Hero() {
  return (
    <header className="about-hero">
      <motion.h1
        initial="hidden"
        animate="visible"
        custom={0.1}
        variants={fadeUp}
      >
        About me
      </motion.h1>
    </header>
  );
}

function Text() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className="about-text"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={0.45}
    >
      <h2>Introduction</h2>
      <p className="about-text-body">
       Hi I'm Tarana! Welcome to my portfolio! I hope you enjoyed the journey here and the intentional design put into this. I'm a first gen student passionate about creative coding interested in both Software Engineering and Game Engineering projects. Feel free to look around and contact me!
      </p>
      <Link to="/Motifs" className="about-text-prompt">
        What's with the travel and Airplane motifs? →
      </Link>
    </motion.div>
  );
}

function Feature() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -60]);

  return (
    <div className="about-feature">
      <div ref={sectionRef} className="about-feature-inner">
        <motion.div
          className="about-feature-image"
          style={{ y: imageY }}
          initial={{ opacity: 0, y: 120, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 120, scale: 0.97 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <img alt="A portrait of you." src={portraitImg} />
        </motion.div>

        <Text />
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="about-intro">
      <Hero />
      <Feature />
    </section>
  );
}

function MainContent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      className="about-main-content"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={0}
    >
      <h2>Outside of work you can find me....</h2>
    </motion.div>
  );
}

function InterestRow({ label, value, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      className="about-interest-row"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
    >
      <span className="about-interest-label">{label}</span>
      <span className="about-interest-value">{value}</span>
    </motion.div>
  );
}

function Rows() {
  return (
    <div className="about-rows">
      <InterestRow label="Listening & Moving:" value="Music & Dance" index={0} />
      <InterestRow label="Curating:" value="Thrifting, Styling, Pinterest" index={1} />
      <InterestRow label="Exploring & Capturing:" value="Coffee shops & Photography" index={2} />
    </div>
  );
}

function Body() {
  return (
    <div className="about-body">
      <MainContent />
      <Rows />
    </div>
  );
}

function GalleryImage({ src, index, bordered }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      className={`about-gallery-image${bordered ? " bordered" : ""}`}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 30 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
    >
      <img alt="" src={src} />
    </motion.div>
  );
}

function Gallery() {
  return (
    <div className="about-gallery">
      <GalleryImage src={galleryImg1} index={0} bordered />
      <GalleryImage src={galleryImg2} index={1} />
      <GalleryImage src={galleryImg3} index={2} bordered />
    </div>
  );
}

function Interests() {
  return (
    <section className="about-interests">
      <Body />
      <Gallery />
    </section>
  );
}

function ExperienceRow({ role, company, year, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      className="about-experience-row"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.13 }}
    >
      <span className="about-exp-role">{role}</span>
      <span className="about-exp-company">{company}</span>
      <span className="about-exp-year">{year}</span>
    </motion.div>
  );
}

function Rows1() {
  return (
    <div className="about-rows1">
      <ExperienceRow role="UI Engineer" company="USC Games: Line by Line" year="2026" index={0} />
      <ExperienceRow role="Programming Mentor" company="Open Alpha" year="2026" index={1} />
      <ExperienceRow role="VR Initiative" company="Shift SC" year="2026" index={2} />
    </div>
  );
}

function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section className="about-experience">
      <motion.div
        ref={ref}
        className="about-experience-header"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeUp}
        custom={0}
      >
        <h2>Notable roles and involvement</h2>
      </motion.div>

      <Rows1 />
      <Link to="/motifs" className="about-cta">
        Curious of my work? →
      </Link>
    </section>
  );
}

function About() {
  return (
    <main className="about-container">
      <Intro />
      <Experience />
      <Interests />
    </main>
  );
}

export default About;