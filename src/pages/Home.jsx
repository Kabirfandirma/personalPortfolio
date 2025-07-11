import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaFigma } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container className="my-5">
            <Row className="align-items-center">
                <Col md={8}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="display-4 fw-bold">Kabir Almustapha Fandirma</h1>
                        <p className="lead">Creative Graphic Designer</p>
                        <p>I specialize in branding, illustrations, and digital art.</p>
                        <Button
                            as={Link}
                            to="/gallery"
                            variant="primary"
                            size="lg"
                        >
                            View My Work
                        </Button>
                    </motion.div>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow">
                        <Card.Img variant="top" src="assets/images/ceo.webp" />
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h3>Tools I Use</h3>
                    <div className="d-flex gap-3 mt-3">
                        <FaFigma size={40} />
                        <SiAdobephotoshop size={40} />
                        <SiAdobeillustrator size={40} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;