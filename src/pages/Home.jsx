import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaFigma } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import AnimatedText from '../components/AnimatedText';
import ceoImage from '../assets/images/ceo.png';

const Home = () => {
    // Memoized styles and data
    const backgroundStyle = useMemo(() => ({
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '190vh',
        position: 'relative'
    }), []);

    const containerStyle = useMemo(() => ({
        backgroundColor: 'rgba(253, 253, 253, 0.53)',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    }), []);

    const buttonStyle = useMemo(() => ({
        backgroundColor: '#262639ff',
        color: 'white',
        transition: 'all 0.3s ease',
    }), []);

    const tools = useMemo(() => [
        { Icon: FaFigma, name: 'Figma' },
        { Icon: SiAdobephotoshop, name: 'Photoshop' },
        { Icon: SiAdobeillustrator, name: 'Illustrator' }
    ], []);

    // Animation variants
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                delay: 1.0
            }
        }
    };

    const toolsContainerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.4,
                staggerChildren: 0.1
            }
        }
    };

    const toolItemVariants = {
        hidden: { scale: 0 },
        visible: (i) => ({
            scale: 1,
            transition: {
                type: "spring",
                delay: 1.5 + i * 0.1
            }
        })
    };

    return (
        <div style={backgroundStyle}>
            <Container className="my-5" style={containerStyle}>
                <Row className="align-items-center g-4">
                    <Col md={8}>
                        <div>
                            <AnimatedText
                                text="Kabir Almustapha Fandirma"
                                element="h1"
                                className="display-4 fw-bold mb-3"
                                delay={0.2}
                                bounceScale={1.3}
                            />

                            <AnimatedText
                                text="Creative Graphic Designer"
                                element="p"
                                className="lead text-muted mb-3"
                                delay={0.4}
                                bounceScale={1.1}
                            />

                            <AnimatedText
                                text="I specialize in branding, illustrations, and digital art."
                                element="p"
                                className="mb-4"
                                delay={0.6}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, type: "spring" }}
                            >
                                <Button
                                    as={Link}
                                    to="/gallery"
                                    variant="info"
                                    size="lg"
                                    style={buttonStyle}
                                    className="hover-effect"
                                >
                                    View My Work
                                </Button>
                            </motion.div>
                        </div>
                    </Col>

                    <Col md={4}>
                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Card className="border-0 shadow overflow-hidden">
                                <Card.Img
                                    variant="top"
                                    src={ceoImage}
                                    alt="Kabir Almustapha Fandirma"
                                    className="img-fluid"
                                />
                            </Card>
                        </motion.div>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <AnimatedText
                            text="Tools I Use"
                            element="h3"
                            className="mb-4"
                            delay={1.2}
                        />
                        <motion.div
                            variants={toolsContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="d-flex flex-wrap gap-4 mt-3"
                        >
                            {tools.map(({ Icon, name }, index) => (
                                <motion.div
                                    key={name}
                                    custom={index}
                                    variants={toolItemVariants}
                                    className="tool-item text-center"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={40} />
                                    <p className="small mt-2 mb-0">{name}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </Col>
                </Row>
            </Container>

            {/* CSS for hover effects - moved to regular CSS or inline styles */}
            <style>{`
                .hover-effect:hover {
                    background-color: #483D8B !important;
                }
                .tool-item {
                    cursor: default;
                    padding: 1rem;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.2);
                    transition: all 0.3s ease;
                }
                .tool-item:hover {
                    background: rgba(255,255,255,0.3);
                }
            `}</style>
        </div>
    );
};

export default Home;