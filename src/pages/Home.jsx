import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaFigma } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import AnimatedText from '../components/AnimatedText';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { InteractiveCard, InteractiveButton, InteractiveImage, GlassCard } from '../components/InteractiveElements';
import { useIntersectionObserver } from '../hooks/useCustomHooks';
import ceoImage from '../assets/images/ceo.png';

const tools = [
    { Icon: FaFigma, name: 'Figma', color: '#F24E1E' },
    { Icon: SiAdobephotoshop, name: 'Photoshop', color: '#31A8FF' },
    { Icon: SiAdobeillustrator, name: 'Illustrator', color: '#FF9A00' },
];

// Enhanced animation variants
const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            staggerChildren: 0.2
        }
    }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: { 
            type: 'spring', 
            stiffness: 200, 
            delay: 0.6,
            duration: 0.8
        },
    },
};

const toolVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: (i) => ({
        scale: 1,
        rotate: 0,
        transition: {
            delay: i * 0.2,
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    })
};

const Home = () => {
    const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.3 });

    return (
        <div className="position-relative min-vh-100">
            {/* Animated Background */}
            <div 
                className="position-absolute w-100 h-100"
                style={{
                    background: `
                        radial-gradient(circle at 20% 80%, rgba(106, 17, 203, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(37, 117, 252, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 50%)
                    `,
                    zIndex: -1
                }}
            />

            <Container className="py-5 px-4" style={{ paddingTop: '100px' }}>
                {/* Hero Section */}
                <motion.div
                    ref={heroRef}
                    variants={heroVariants}
                    initial="hidden"
                    animate={heroInView ? "visible" : "hidden"}
                >
                    <Row className="align-items-center g-5 min-vh-75">
                        <Col lg={6}>
                            <motion.div variants={heroVariants}>
                                <AnimatedText
                                    text="Kabir Almustapha Fandirma"
                                    element="h1"
                                    className="display-4 fw-bold mb-3"
                                    animationType="words"
                                    enableHover={true}
                                    delay={0.1}
                                />
                                
                                <AnimatedText
                                    text="Creative Graphic Designer"
                                    element="h2"
                                    className="h3 mb-4"
                                    animationType="letters"
                                    delay={0.5}
                                />
                                
                                <motion.p 
                                    className="lead mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                >
                                    I specialize in creating stunning visual identities, 
                                    brand designs, and digital art that tells compelling stories 
                                    and captivates audiences.
                                </motion.p>

                                <motion.div
                                    className="d-flex gap-3 flex-wrap"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    <InteractiveButton 
                                        as={Link} 
                                        to="/gallery" 
                                        className="btn btn-primary btn-lg px-4"
                                    >
                                        View My Work
                                    </InteractiveButton>
                                    
                                    <InteractiveButton 
                                        as={Link} 
                                        to="/contact" 
                                        className="btn btn-outline-primary btn-lg px-4"
                                    >
                                        Get In Touch
                                    </InteractiveButton>
                                </motion.div>
                            </motion.div>
                        </Col>

                        <Col lg={6}>
                            <motion.div
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-center"
                            >
                                <InteractiveCard className="profile-card border-0 overflow-hidden">
                                    <GlassCard className="p-4">
                                        <InteractiveImage
                                            src={ceoImage}
                                            alt="Kabir Almustapha Fandirma"
                                            className="rounded-4 img-fluid"
                                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                                        />
                                    </GlassCard>
                                </InteractiveCard>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>

                {/* Tools Section */}
                <ScrollReveal className="mt-5 pt-5">
                    <Row>
                        <Col>
                            <AnimatedText
                                text="Creative Tools & Expertise"
                                element="h3"
                                className="h2 text-center mb-5"
                                animationType="words"
                                enableHover={true}
                            />
                            
                            <StaggerContainer className="d-flex justify-content-center flex-wrap gap-4">
                                {tools.map(({ Icon, name, color }, index) => (
                                    <StaggerItem key={name}>
                                        <motion.div
                                            custom={index}
                                            variants={toolVariants}
                                            whileHover={{ 
                                                scale: 1.1, 
                                                rotate: 5,
                                                transition: { type: "spring", stiffness: 400 }
                                            }}
                                        >
                                            <GlassCard className="tool-card text-center p-4">
                                                <motion.div
                                                    whileHover={{ 
                                                        color: color,
                                                        textShadow: `0 0 20px ${color}`,
                                                        scale: 1.2
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <Icon size={48} className="mb-3" />
                                                </motion.div>
                                                <h5 className="fw-semibold">{name}</h5>
                                            </GlassCard>
                                        </motion.div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </Col>
                    </Row>
                </ScrollReveal>

                {/* Stats Section */}
                <ScrollReveal className="mt-5 pt-5">
                    <StaggerContainer>
                        <Row className="text-center">
                            {[
                                { number: '100+', label: 'Projects Completed' },
                                { number: '50+', label: 'Happy Clients' },
                                { number: '3+', label: 'Years Experience' },
                                { number: '24/7', label: 'Support Available' }
                            ].map((stat, index) => (
                                <Col md={3} key={index} className="mb-4">
                                    <StaggerItem>
                                        <GlassCard className="p-4 h-100">
                                            <motion.h3 
                                                className="display-5 fw-bold text-primary mb-2"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {stat.number}
                                            </motion.h3>
                                            <p className="mb-0">{stat.label}</p>
                                        </GlassCard>
                                    </StaggerItem>
                                </Col>
                            ))}
                        </Row>
                    </StaggerContainer>
                </ScrollReveal>
            </Container>
        </div>
    );
};

export default Home;
