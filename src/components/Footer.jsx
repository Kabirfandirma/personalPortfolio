import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaBehance, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    const socialLinks = [
        {
            icon: <FaInstagram size={20} />,
            url: "https://instagram.com/kafandigitals",
            name: "Instagram"
        },
        {
            icon: <FaBehance size={20} />,
            url: "https://behance.net/kafandigitals",
            name: "Behance"
        },
        {
            icon: <FaLinkedin size={20} />,
            url: "https://linkedin.com/in/kafandigitals",
            name: "LinkedIn"
        }
    ];

    const footerLinks = [
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/gallery" },
        { name: "Testimonials", path: "/testimonials" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <footer className="bg-dark text-white pt-5 pb-4">
            <Container>
                <Row className="g-4">
                    {/* Brand Column */}
                    <Col lg={4} className="mb-4 mb-lg-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="h4 mb-3 fw-bold">Kabir Almustapha Fandirma</h3>
                            <p className="text-muted mb-4">Transforming ideas into visually stunning realities through graphic design and visual storytelling.</p>

                            <div className="d-flex flex-column gap-2">
                                <motion.a
                                    href="mailto:kabir@example.com"
                                    className="text-white text-decoration-none"
                                    whileHover={{ opacity: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaEnvelope className="me-2" /> kafaan1980@gmail.com
                                </motion.a>
                                <motion.a
                                    href="tel:+2347039350100"
                                    className="text-white text-decoration-none"
                                    whileHover={{ opacity: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <FaPhone className="me-2" /> +2347039350100
                                </motion.a>
                            </div>
                        </motion.div>
                    </Col>

                    {/* Quick Links Column */}
                    <Col lg={2} md={6} className="mb-4 mb-md-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="h5 mb-3 fw-bold">Quick Links</h4>
                            <ul className="list-unstyled">
                                {footerLinks.map((link, index) => (
                                    <li key={index} className="mb-2">
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className="text-white text-decoration-none"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </Col>

                    {/* Social Media Column */}
                    <Col lg={6} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="h5 mb-3 fw-bold">Connect With Me</h4>
                            <div className="d-flex gap-3 mb-4">
                                {socialLinks.map((social, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{
                                            y: -5,
                                            scale: 1.1,
                                            backgroundColor: 'rgba(13, 110, 253, 0.2)'
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="rounded-circle"
                                    >
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white bg-primary bg-opacity-10 rounded-circle p-3 d-flex align-items-center justify-content-center"
                                            style={{ display: 'inline-block' }}
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Newsletter Signup */}
                            <div className="mb-3">
                                <h5 className="h6 mb-2 text-light">Get design insights</h5>
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            className="form-control bg-gray-800 text-white border-gray-700 placeholder-gray-400"
                                            placeholder="Your email"
                                            aria-label="Email"
                                        />
                                        <motion.button
                                            className="btn btn-primary px-4"
                                            type="button"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Subscribe
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </Col>
                </Row>

                {/* Copyright */}
                <Row className="mt-4 pt-3 border-top border-gray-800">
                    <Col className="text-center text-gray-400">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            &copy; {new Date().getFullYear()} Kabir Almustapha Fandirma. All rights reserved.
                        </motion.p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;