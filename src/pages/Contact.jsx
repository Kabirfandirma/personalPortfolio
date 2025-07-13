import { useState, useRef } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';

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

            // Simulate form submission (replace with your backend logic)
            setTimeout(() => {
                console.log('Form data:', formData); // Replace with actual submission
                setShowSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                setIsSubmitting(false);
                setTimeout(() => setShowSuccess(false), 5000);
            }, 1500);
        }
    };

    return (
        <Container className="my-5 py-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto"
                style={{ maxWidth: '600px' }}
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
                    className="bg-white p-4 rounded-3 shadow-sm"
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

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
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
    );
};

export default Contact;