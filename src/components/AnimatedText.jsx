import { motion } from 'framer-motion';

// Animation variants for different text effects
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 24,
    }
  })
};

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 300,
      damping: 24,
    }
  })
};

const hoverVariants = {
  hover: {
    scale: 1.05,
    textShadow: "0px 0px 8px rgba(106, 17, 203, 0.8)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    }
  }
};

export default function AnimatedText({
    text,
    element = 'div',
    className = '',
    delay = 0,
    duration = 0.6,
    bounceScale = 1.2,
    animationType = 'default', // 'default', 'words', 'letters'
    enableHover = false
}) {
    const Element = motion[element] || motion.div;

    if (animationType === 'words') {
        const words = text.split(' ');
        return (
            <Element className={className}>
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={wordVariants}
                        whileHover={enableHover ? hoverVariants.hover : {}}
                        style={{ display: 'inline-block', marginRight: '0.3em' }}
                    >
                        {word}
                    </motion.span>
                ))}
            </Element>
        );
    }

    if (animationType === 'letters') {
        const letters = text.split('');
        return (
            <Element className={className}>
                {letters.map((letter, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={letterVariants}
                        whileHover={enableHover ? hoverVariants.hover : {}}
                        style={{ display: 'inline-block' }}
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                ))}
            </Element>
        );
    }

    return (
        <Element
            initial="hidden"
            animate="visible"
            variants={textVariants}
            whileHover={enableHover ? hoverVariants.hover : {}}
            style={{ 
                display: 'inline-block',
                transformOrigin: 'center'
            }}
            transition={{
                delay: delay,
                duration: duration,
                type: "spring",
                stiffness: 300,
                damping: 24,
            }}
            className={className}
        >
            {text}
        </Element>
    );
}