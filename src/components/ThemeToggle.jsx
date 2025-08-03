import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const switchVariants = {
  on: { x: 20 },
  off: { x: 0 },
};

const iconVariants = {
  sun: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  moon: {
    scale: 0.8,
    rotate: 180,
    opacity: 0.7,
  },
};

export function ThemeToggle({ className = "" }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`theme-toggle d-flex align-items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="position-relative d-flex align-items-center">
        <motion.div
          className="position-absolute"
          variants={iconVariants}
          animate={isDark ? "moon" : "sun"}
          style={{ left: isDark ? 0 : 24 }}
        >
          {isDark ? <FiMoon size={16} /> : <FiSun size={16} />}
        </motion.div>

        <div
          className="bg-secondary rounded-pill position-relative"
          style={{
            width: "50px",
            height: "24px",
            backgroundColor: isDark ? "var(--primary)" : "var(--secondary)",
          }}
        >
          <motion.div
            className="bg-white rounded-circle position-absolute"
            style={{
              width: "20px",
              height: "20px",
              top: "2px",
              left: "2px",
            }}
            variants={switchVariants}
            animate={isDark ? "on" : "off"}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </div>
    </motion.button>
  );
}
