import { useState, useRef } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Email connection
const SERVICE_ID = 'service_hakfzwk';
const TEMPLATE_ID = 'template_qsh926g';
const PUBLIC_KEY = 'wUVm81MUQAJNox6vu';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const formRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
                .then(() => {
                    setShowSuccess(true);
                    setFormData({ name: '', email: '', message: '' });
                    setIsSubmitting(false);
                    setTimeout(() => setShowSuccess(false), 5000);
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    alert('Something went wrong. Please try again later.');
                    setIsSubmitting(false);
                });
        }
    };

    return (
        <div className="contact-section">
            <div className="overlay" />

            <Container className="contact-wrapper my-5 py-4 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto"
                    style={{ maxWidth: '700px' }}
                >
                    <h2 className="text-center mb-4 display-5 fw-bold">Contact Me</h2>
                    <p className="text-center mb-5 text-muted">
                        Let's create something amazing together
                    </p>

                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <Alert
                                    variant="success"
                                    className="d-flex align-items-center shadow-sm"
                                    onClose={() => setShowSuccess(false)}
                                    dismissible
                                >
                                    <FaCheckCircle className="me-2 flex-shrink-0" />
                                    <span>Message sent successfully! I'll respond within 24 hours.</span>
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="p-4 rounded-3 shadow-sm bg-white"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Form.Group className="mb-4" controlId="name">
                                <Form.Label className="fw-medium">Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                    className="py-2 px-3"
                                />
                                <Form.Control.Feedback type="invalid" className="d-block">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="email">
                                <Form.Label className="fw-medium">Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                    className="py-2 px-3"
                                />
                                <Form.Control.Feedback type="invalid" className="d-block">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="message">
                                <Form.Label className="fw-medium">Your Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    isInvalid={!!errors.message}
                                    className="py-2 px-3"
                                />
                                <Form.Control.Feedback type="invalid" className="d-block">
                                    {errors.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    size="lg"
                                    className="w-100 py-3 fw-medium"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="me-2 fa-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="me-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </Form>
                </motion.div>
            </Container>

            {/* Embedded CSS */}
            <style>{`
                .contact-section {
                    background-image: url(${process.env.PUBLIC_URL}/images/big2.gif);
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    min-height: 100vh;
                    position: relative;
                    color: #1c1c1c;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.19);
                    z-index: 1;
                }

                .contact-wrapper {
                    position: relative;
                    z-index: 2;
                    background-color: rgba(255, 255, 255, 0.85);
                    border-radius: 12px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                }

                .form-control {
                    border-radius: 8px;
                }

                .btn-primary {
                    background-color: #262639;
                    border: none;
                    transition: 0.3s;
                }

                .btn-primary:hover {
                    background-color: #483D8B;
                }
            `}</style>
        </div>
    );
};

export default Contact;
