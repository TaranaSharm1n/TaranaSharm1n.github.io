import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function CursorTrail() {
  const [trail, setTrail] = useState([]);
  const idRef = useRef(0);
  const lastPos = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < 11) return;
      lastPos.current = { x: e.clientX, y: e.clientY };
      const id = idRef.current++;
      setTrail((prev) => [...prev.slice(-28), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setTrail((prev) => prev.filter((d) => d.id !== id));
      }, 700);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {trail.map((dot, i) => {
        const relativeAge = i / Math.max(trail.length - 1, 1);
        const size = 3 + relativeAge * 2.5;
        return (
          <motion.div
            key={dot.id}
            style={{
              position: "fixed",
              left: dot.x - size / 2,
              top: dot.y - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "#37372b",
            }}
            initial={{ opacity: 0.65, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

export default CursorTrail;