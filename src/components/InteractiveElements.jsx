import { motion } from 'framer-motion';

const cardVariants = {
  idle: { 
    scale: 1, 
    rotateY: 0,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    scale: 1.05, 
    rotateY: 5,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 20
    }
  }
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05, 
    boxShadow: "0 10px 20px rgba(106, 17, 203, 0.3)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: { scale: 0.95 }
};

const imageVariants = {
  idle: { scale: 1, filter: "brightness(1)" },
  hover: { 
    scale: 1.1, 
    filter: "brightness(1.1)",
    transition: { duration: 0.3 }
  }
};

export function InteractiveCard({ 
  children, 
  className = '',
  enableTilt = true,
  ...props 
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      className={`interactive-card ${className}`}
      style={{ perspective: "1000px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function InteractiveButton({ 
  children, 
  className = '',
  variant = 'primary',
  ...props 
}) {
  const baseClasses = `btn btn-${variant} ${className}`;

  return (
    <motion.button
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      className={baseClasses}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function InteractiveImage({ 
  src, 
  alt, 
  className = '',
  ...props 
}) {
  return (
    <motion.div
      variants={imageVariants}
      initial="idle"
      whileHover="hover"
      className={`overflow-hidden ${className}`}
      style={{ borderRadius: "12px" }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-100 h-100"
        style={{ objectFit: "cover" }}
        {...props}
      />
    </motion.div>
  );
}

export function GlassCard({ children, className = '', ...props }) {
  return (
    <div className={`glass-card ${className}`} {...props}>
      {children}
    </div>
  );
}
