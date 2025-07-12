import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaBehance, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>Kabir Almustapha Fandirma</h5>
                        <p>Graphic Designer & Visual Storyteller</p>
                    </Col>
                    <Col md={6} className="text-end">
                        <a href="https://instagram.com/kafandigitals" className="text-white mx-2"><FaInstagram size={25} /></a>
                        <a href="https://behance.net" className="text-white mx-2"><FaBehance size={25} /></a>
                        <a href="https://linkedin.com" className="text-white mx-2"><FaLinkedin size={25} /></a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;