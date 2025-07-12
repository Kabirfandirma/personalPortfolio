import ceoImage from '../assets/images/ceo.png';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaFigma } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import { Link } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';

const Home = () => {
    return (
        <div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg.jpg)`,

            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '190vh',
            position: 'relative'
        }}>
            <br />
            <Container className="my-5" style={{
                backgroundColor: 'rgba(253, 253, 253, 0.53)', // semi-transparent white
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: '0 0 20px rgba(0,0,0,0.1)'

            }}>
                <Row className="align-items-center">
                    <Col md={8}>
                        <div>
                            {/* Name with strong pop effect */}
                            <AnimatedText
                                text="Kabir Almustapha Fandirma"
                                element="h1"
                                className="display-4 fw-bold"
                                //  className="display-4 fw-bold text-white" 
                                delay={0.2}
                                bounceScale={1.3} // Stronger pop
                            />

                            {/* Title with medium pop */}
                            <AnimatedText
                                text="Creative Graphic Designer"
                                element="p"
                                className="lead"
                                delay={0.4}
                                bounceScale={1.1}
                            />

                            {/* Description with subtle pop */}
                            <AnimatedText
                                text="I specialize in branding, illustrations, and digital art."
                                element="p"
                                delay={0.6}
                            />

                            {/* Animated Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="mt-3"
                            >
                                <Button
                                    as={Link}
                                    to="/gallery"
                                    variant="info"
                                    style={{
                                        backgroundColor: '#262639ff', // Your custom color
                                        // borderColor: '#FF5733',
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                    }}

                                    size="lg"
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#483D8B'} // DarkSlateBlue
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#262639ff'}
                                >
                                    View My Work
                                </Button>
                            </motion.div>
                        </div>
                    </Col>

                    {/* Image with pop-in */}
                    <Col md={4}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    delay: 1.0
                                }
                            }}
                        ><br />
                            <Card className="border-0 shadow">
                                <Card.Img variant="top" src={ceoImage} />
                            </Card>
                        </motion.div>
                    </Col>
                </Row>

                {/* Tools section */}
                <Row className="mt-5">
                    <Col>
                        <AnimatedText
                            text="Tools I Use"
                            element="h3"
                            delay={1.2}
                        />
                        <motion.div
                            className="d-flex gap-3 mt-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: 1.4,
                                    staggerChildren: 0.1
                                }
                            }}
                        >
                            {[FaFigma, SiAdobephotoshop, SiAdobeillustrator].map((Icon, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        delay: 1.5 + index * 0.1
                                    }}
                                >
                                    <Icon size={40} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;