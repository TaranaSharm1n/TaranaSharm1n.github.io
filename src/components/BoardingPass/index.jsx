import './index.css'
import { useState, useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";

import { WashiTape, PinDot } from "../Decorations";

import passFrame from '../../assets/frames/BorderFrame (1).png'
import passRight from '../../assets/tempAssets/Final_BoardingPassRight.png'
import passLeft from '../../assets/tempAssets/Final_BoardingPassLeft.png'

function BoardingPass({ onTear }) {
  const [torn, setTorn] = useState(false);
  const [hovering, setHovering] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    });
  }, [controls]);

  const handleDragEnd = async (event, info) => {
    const dx = info.offset.x;
    const dy = info.offset.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 120) {
      const angle = Math.atan2(dy, dx);
      const flyDistance = 500;
      await controls.start({
        x: dx + Math.cos(angle) * flyDistance,
        y: dy + Math.sin(angle) * flyDistance,
        opacity: 0,
        rotate: 15,
        transition: { duration: 0.45, ease: [0.2, 0, 0.85, 1] },
      });
      setTorn(true);
      onTear?.();
    } else {
      controls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 240, damping: 22 },
      });
    }
  };

  return (
    <div className="Boarding-Pass">
      <WashiTape width="10%" rotation={-43} color="rgba(155,174,127,0.82)" style={{ left: "-3%", top: "-4%" }} />
      <WashiTape width="10%" rotation={43} color="rgba(155,174,127,0.7)" style={{ right: "-3%", top: "-4%" }} />
      <WashiTape width="8%" rotation={43} color="rgba(155,174,127,0.6)" style={{ left: "-2%", bottom: "-4%" }} />
      <PinDot style={{ left: "1%", top: "1%" }} />
      <PinDot style={{ right: "1%", top: "1%" }} />
      <motion.img
        src={passFrame}
        alt=""
        aria-hidden="true"
        className="Pass-Frame"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <motion.div
        className="pass-pieces"
        animate={
          !torn
            ? { y: [0, -6, -2, -6, 0], rotate: [-0.1, 0.3, 0.05, 0.3, -0.1] }
            : { y: 0, rotate: 0 }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.img
          src={passLeft}
          alt="Boarding pass stub"
          className="tear-edge tear-edge-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {!torn && (
          <motion.div
            className="tear-edge tear-edge-right"
            drag
            dragMomentum={false}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
            whileDrag={{ scale: 1.05 }}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ pointerEvents: torn ? 'none' : 'auto', position: "relative" }}
          >
            <img
              src={passRight}
              alt="Ticket stub, drag to tear off"
              style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", display: "block" }}
            />
            <motion.span
              className="drag-hint-text"
              animate={{ opacity: hovering ? 0.75 : 0, y: hovering ? 0 : 4 }}
              transition={{ duration: 0.25 }}
            >
              ← drag to tear
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default BoardingPass;