import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function WashiTape({ width, rotation, color, style }) {
  return (
    <div
      style={{
        position: "absolute",
        width,
        height: 24,
        background: color,
        transform: `rotate(${rotation}deg)`,
        opacity: 0.75,
        ...style,
      }}
    />
  );
}

function PinDot({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #c7d4ab, #6f8a52)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
        ...style,
      }}
    />
  );
}

function Stamp({ lines, size = 82, rotation, color = "#4a6a3a", style }) {
  const r = size / 2;
  return (
    <div style={{ position: "absolute", transform: `rotate(${rotation}deg)`, opacity: 0.3, ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={r} cy={r} r={r - 4} fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="5 3" />
        <circle cx={r} cy={r} r={r - 13} fill="none" stroke={color} strokeWidth="1.1" />
        {lines.map((line, i) => (
          <text key={i} x={r} y={r + (i - (lines.length - 1) / 2) * 11.5} textAnchor="middle"
            dominantBaseline="middle" fontSize="7.5" fontFamily="Georgia, serif" fill={color}
            fontWeight="bold" letterSpacing="1.5">
            {line}
          </text>
        ))}
      </svg>
    </div>
  );
}

function Squiggle({ style, rotation = 0, color = "#4a6a3a" }) {
  return (
    <svg style={{ position: "absolute", transform: `rotate(${rotation}deg)`, opacity: 0.2, ...style }}
      width="60" height="18" viewBox="0 0 60 18">
      <path d="M2 9 Q9 2 16 9 Q23 16 30 9 Q37 2 44 9 Q51 15 58 9" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CoffeeRing({ style, rotation = 0 }) {
  return (
    <div style={{ position: "absolute", transform: `rotate(${rotation}deg)`, opacity: 0.14, ...style }}>
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r="30" fill="none" stroke="#6a8a50" strokeWidth="5" opacity="0.8" />
        <circle cx="35" cy="35" r="28" fill="none" stroke="#6a8a50" strokeWidth="1" opacity="0.4" />
        <circle cx="35" cy="35" r="24" fill="none" stroke="#6a8a50" strokeWidth="0.5" opacity="0.25" />
      </svg>
    </div>
  );
}

function DecorationLayer() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smX = useSpring(mouseX, { stiffness: 32, damping: 18 });
  const smY = useSpring(mouseY, { stiffness: 32, damping: 18 });
  const px = useTransform(smX, [-1, 1], [-10, 10]);
  const py = useTransform(smY, [-1, 1], [-7, 7]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const sparkles = [
    { left: "8%", top: "55%", rot: 20, size: 20, op: 0.25 },
    { right: "16%", top: "10%", rot: -12, size: 16, op: 0.22 },
    { left: "22%", bottom: "16%", rot: 7, size: 13, op: 0.18 },
    { right: "6%", top: "48%", rot: -30, size: 15, op: 0.16 },
    { left: "35%", top: "10%", rot: 15, size: 11, op: 0.16 },
  ];

  return (
    <motion.div
      className="decoration-layer"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", x: px, y: py }}
      onMouseMove={handleMouseMove}
    >
      <Stamp lines={["FLIGHT", "TS—007"]} rotation={-18} style={{ left: "6%", top: "16%" }} />
      <Stamp lines={["DESTINATION", "PORTFOLIO"]} size={78} rotation={10} style={{ right: "9%", bottom: "22%" }} />
      <Stamp lines={["EXPLORE"]} size={60} rotation={-5} style={{ left: "13%", bottom: "24%" }} />
      <Stamp lines={["DEPART"]} size={54} rotation={22} style={{ right: "16%", top: "12%" }} />

      <CoffeeRing style={{ left: "5%", bottom: "38%" }} rotation={12} />
      <CoffeeRing style={{ right: "20%", top: "14%" }} rotation={-5} />

      <Squiggle rotation={-5} style={{ left: "6%", top: "40%" }} />
      <Squiggle rotation={8} style={{ right: "7%", bottom: "32%" }} />
      <Squiggle rotation={-18} style={{ left: "9%", top: "20%" }} />

      {sparkles.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.left, right: s.right, top: s.top, bottom: s.bottom,
            transform: `rotate(${s.rot}deg)`,
            opacity: s.op,
            fontSize: s.size,
            color: "#4a6a3a",
            fontFamily: "Georgia, serif",
          }}
        >
          ✦
        </div>
      ))}
    </motion.div>
  );
}

export { WashiTape, PinDot, CoffeeRing, DecorationLayer };