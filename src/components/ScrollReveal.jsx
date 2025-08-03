import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useCustomHooks';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export function ScrollReveal({ 
  children, 
  className = '',
  variants = fadeInUpVariants,
  threshold = 0.1,
  once = true 
}) {
  const [ref, isVisible, hasBeenVisible] = useIntersectionObserver({ 
    threshold,
    rootMargin: '-50px'
  });

  const shouldAnimate = once ? hasBeenVisible : isVisible;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = '' }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={staggerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
