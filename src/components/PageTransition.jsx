import { motion } from 'framer-motion';

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95 
  },
  in: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  out: { 
    opacity: 0, 
    y: -20, 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const slideVariants = {
  initial: { x: "100vw" },
  in: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
  out: { 
    x: "-100vw",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const fadeVariants = {
  initial: { opacity: 0 },
  in: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  out: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export function PageTransition({ 
  children, 
  variant = 'default',
  className = '' 
}) {
  const variants = {
    default: pageVariants,
    slide: slideVariants,
    fade: fadeVariants
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
