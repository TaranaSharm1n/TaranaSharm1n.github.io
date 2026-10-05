import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css";

import stampImg from "../../assets/tempAssets/Stamp.png";

function DepartureStamp() {
  return (
    <motion.div
      className="departure-stamp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.1,
        filter: "drop-shadow(0 0 8px #4a5a3a)",
      }}
    >
      <Link
        to="/#about"
        onClick={(event) => {
          event.preventDefault();

          document.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        <img
          src={stampImg}
          alt="Departure approved, click to visit About"
        />
      </Link>
    </motion.div>
  );
}

export default DepartureStamp;