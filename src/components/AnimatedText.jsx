import { motion } from 'framer-motion';

export default function AnimatedText({
    text,
    element = 'div',
    className = '',
    delay = 0,
    duration = 0.6,
    bounceScale = 1.2 // How much the text "pops out"
}) {
    const Element = motion[element] || motion.div;

    return (
        <Element
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    delay: delay,
                }
            }}
            whileHover={{ scale: 1.05 }} // Optional: Adds a slight hover effect
            className={className}
        >
            {text}
        </Element>
    );
}