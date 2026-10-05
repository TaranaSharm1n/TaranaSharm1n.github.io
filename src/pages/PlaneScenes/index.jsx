import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

import planeVideo from "../../assets/tempAssets/PlaneAnimation.mp4";
import insidePlane from "../../assets/tempAssets/Attendant.png";
import planeWindow from "../../assets/tempAssets/PlaneWindow.png";

import DepartureStamp from "../../components/DepartureStamp";

function Panel({ number, title, caption, children }) {
  return (
    <div className="journal-panel">
      <div className="journal-panel-frame">
        <div className="journal-panel-badge">{number}</div>
        {children}
      </div>
      <div className="journal-panel-caption">
        <span className="journal-panel-title">{title}</span>
        <span className="journal-panel-subtitle">— {caption}</span>
      </div>
    </div>
  );
}

function PlaneScenes() {
  const [stage, setStage] = useState("panelEnter");
  const videoRef = useRef(null);

  const handlePanelEntranceComplete = () => {
    setStage("planeAnim");
    videoRef.current?.play();
  };

  const handleVideoEnded = () => {
    setTimeout(() => setStage("awayWeGo"), 300);
  };

  const handleAwayWeGoComplete = () => {
    if (stage === "awayWeGo") {
      setTimeout(() => setStage("detailPanels"), 800);
    }
  };

  return (
    <section id="plane-scenes" className="plane-scenes">
      <span className="dash-line dash-line-top-1" />
      <span className="dash-line dash-line-top-2" />

      <div className="journal-card">
        <div className="journal-header">
          <span className="journal-header-label">Flight Journal</span>
          <span className="journal-header-label">TS — 007</span>
        </div>

        <motion.div
  className="top-panel"
  initial={{ y: -100, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  onAnimationComplete={handlePanelEntranceComplete}
>
  <Panel number="01" title="The Wait" caption="Watching another plane climb into the clouds">
    <video
      ref={videoRef}
      src={planeVideo}
      muted
      playsInline
      onEnded={handleVideoEnded}
    />

    <AnimatePresence>
      {(stage === "awayWeGo" || stage === "detailPanels" || stage === "stamp") && (
        <motion.div
          className="away-we-go"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={handleAwayWeGoComplete}
        >
          Away we go...
        </motion.div>
      )}
    </AnimatePresence>
  </Panel>
</motion.div>

        <AnimatePresence>
          {(stage === "detailPanels" || stage === "stamp") && (
            <motion.div
              className="detail-panels"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() =>
                stage === "detailPanels" && setStage("stamp")
              }
            >
              <Panel number="02" title="Aboard" caption="Everyone finds their seat">
                <img src={insidePlane} alt="Inside the plane, passengers settling in" />
              </Panel>
              <Panel number="03" title="New Horizon" caption="A new city waits beyond the glass">
                <img src={planeWindow} alt="Looking out the plane window" />
              </Panel>
            </motion.div>
          )}
        </AnimatePresence>

        {stage === "stamp" && (
          <motion.div
            className="journal-stamp"
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: -10 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <DepartureStamp />
          </motion.div>
        )}
      </div>

      <span className="dash-line dash-line-bottom-1" />
      <span className="dash-line dash-line-bottom-2" />
    </section>
  );
}

export default PlaneScenes;