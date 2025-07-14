import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaFigma } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import AnimatedText from '../components/AnimatedText';
import ceoImage from '../assets/images/ceo.png';

const tools = [
    { Icon: FaFigma, name: 'Figma' },
    { Icon: SiAdobephotoshop, name: 'Photoshop' },
    { Icon: SiAdobeillustrator, name: 'Illustrator' },
];

// Animation variants
const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 200, delay: 0.6 },
    },
};

const Home = () => {
    return (
        <div className="home-section">
            <div className="overlay" />
            <Container className="content-wrapper py-5 px-4">
                <Row className="align-items-center g-5">
                    <Col md={6}>
                        <div>
                            <AnimatedText
                                text="Kabir Almustapha Fandirma"
                                element="h1"
                                className="hero-title mb-3"
                                delay={0.1}
                            />
                            <AnimatedText
                                text="Creative Graphic Designer"
                                element="p"
                                className="hero-subtitle mb-3"
                                delay={0.3}
                            />
                            <AnimatedText
                                text="I specialize in branding, illustrations, and digital art."
                                element="p"
                                className="hero-description mb-4"
                                delay={0.5}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <Link to="/gallery">
                                    <Button className="cta-button" size="lg">
                                        View My Work
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </Col>

                    <Col md={6}>
                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-center"
                        >
                            <Card className="profile-card shadow border-0">
                                <Card.Img
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
                            className="tools-title mb-4 text-center"
                            delay={1}
                        />
                        <div className="d-flex justify-content-center flex-wrap gap-4">
                            {tools.map(({ Icon, name }, index) => (
                                <motion.div
                                    key={name}
                                    className="tool-box text-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.1 + index * 0.2, type: 'spring' }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Icon size={40} />
                                    <p className="mt-2 mb-0 small fw-medium">{name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Embedded CSS */}
            <style>{`
        .home-section {
          background-image: url(${process.env.PUBLIC_URL}/images/bg.jpg);
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          min-height: 100vh;
          position: relative;
          color: #1c1c1c;
        }

        .overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(255,255,255,0.65);
          z-index: 1;
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
        }

        .hero-subtitle {
          font-size: 1.4rem;
          color: #6c757d;
        }

        .hero-description {
          font-size: 1rem;
          color: #333;
        }

        .cta-button {
          background-color: #262639;
          border: none;
          padding: 10px 30px;
          font-weight: 500;
          transition: 0.3s;
        }

        .cta-button:hover {
          background-color: #483D8B;
        }

        .profile-card img {
          border-radius: 12px;
        }

        .tool-box {
          background: rgba(0, 0, 0, 0.05);
          padding: 1rem 1.5rem;
          border-radius: 10px;
          min-width: 120px;
          transition: all 0.3s ease;
        }

        .tools-title {
          font-weight: 600;
          font-size: 1.5rem;
        }
      `}</style>
        </div>
    );
};

export default Home;
