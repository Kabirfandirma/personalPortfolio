import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaQuoteLeft, FaStar, FaRegStar, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([
        {
            id: 1,
            name: "Mr. Elkanah",
            role: "Marketing Director",
            text: "Kabir's designs transformed our brand identity. His attention to detail and creative vision exceeded our expectations.",
            rating: 5,
            photo: "/assets/images/clients/elkanah.jpg"
        },
        {
            id: 2,
            name: "Mrs. Confidence",
            role: "Startup Founder",
            text: "Working with Kabir was a pleasure. He delivered our project on time and with exceptional quality.",
            rating: 4,
            photo: "/assets/images/clients/confidence.jpg"
        },
        {
            id: 3,
            name: "Mr. Abubakar",
            role: "Art Director",
            text: "One of the most talented graphic designers I've collaborated with. Highly recommended!",
            rating: 5,
            photo: "/assets/images/clients/mukhtar.jpg"
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        text: '',
        rating: 5,
        photo: ''
    });

    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.text.trim()) newErrors.text = 'Testimonial is required';
        if (formData.text.length > 300) newErrors.text = 'Testimonial must be less than 300 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newTestimonial = {
                id: testimonials.length + 1,
                ...formData,
                photo: formData.photo || '/assets/images/default-avatar.jpg'
            };

            setTestimonials([...testimonials, newTestimonial]);
            setFormData({ name: '', role: '', text: '', rating: 5, photo: '' });
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            setShowForm(false);
        }
    };

    const renderStars = (rating, interactive = false) => {
        return [...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
                <span
                    key={i}
                    className="position-relative"
                    onClick={() => interactive && handleRatingChange(starValue)}
                    style={interactive ? { cursor: 'pointer' } : {}}
                >
                    {rating >= starValue
                        ? <FaStar className="text-warning" />
                        : <FaRegStar className="text-warning opacity-25" />}
                </span>
            );
        });
    };

    return (
        <div className="testimonials-section">
            <div className="overlay" />

            <Container className="testimonials-wrapper py-5 px-3" id="testimonials">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Client Testimonials</h2>
                        <p className="lead text-muted">What my clients say about my work</p>

                        <Button
                            variant="primary"
                            onClick={() => setShowForm(!showForm)}
                            className="mt-3"
                        >
                            {showForm ? 'Hide Form' : 'Add Your Testimonial'}
                        </Button>
                    </div>

                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-5"
                        >
                            <Card className="border-0 shadow">
                                <Card.Body>
                                    <h4 className="mb-4">Share Your Experience</h4>
                                    {submitted && (
                                        <Alert variant="success" className="d-flex align-items-center">
                                            <FaCheck className="me-2" />
                                            Thank you for your testimonial!
                                        </Alert>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Your Name *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Your Role/Position</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Your Testimonial *</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="text"
                                                value={formData.text}
                                                onChange={handleInputChange}
                                                isInvalid={!!errors.text}
                                            />
                                            <Form.Text className="text-muted">
                                                {formData.text.length}/300 characters
                                            </Form.Text>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.text}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Your Rating</Form.Label>
                                            <div className="d-flex align-items-center">
                                                <div className="me-3" style={{ fontSize: '1.5rem' }}>
                                                    {renderStars(formData.rating, true)}
                                                </div>
                                                <span className="text-muted">
                                                    {formData.rating}.0
                                                </span>
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Photo URL (optional)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="photo"
                                                value={formData.photo}
                                                onChange={handleInputChange}
                                                placeholder="Paste image URL"
                                            />
                                        </Form.Group>

                                        <div className="d-flex justify-content-end">
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => setShowForm(false)}
                                                className="me-2"
                                            >
                                                Cancel
                                            </Button>
                                            <Button variant="primary" type="submit">
                                                Submit Testimonial
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    )}

                    <Slider {...settings}>
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                whileHover={{ scale: 1.02 }}
                                className="px-3"
                            >
                                <Card className="border-0 shadow-sm h-100 overflow-hidden">
                                    <Card.Body className="p-4 position-relative">
                                        <div className="position-absolute top-0 start-0 w-100 bg-primary" style={{ height: '4px' }}></div>

                                        <motion.div
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="mb-4 text-primary opacity-10"
                                            style={{ fontSize: '4rem', position: 'absolute', top: '10px', right: '20px', zIndex: 0 }}
                                        >
                                            <FaQuoteLeft />
                                        </motion.div>

                                        <div className="d-flex align-items-center mb-4 position-relative z-1">
                                            <div className="rounded-circle overflow-hidden me-3" style={{ width: '60px', height: '60px' }}>
                                                <img
                                                    src={testimonial.photo}
                                                    alt={testimonial.name}
                                                    className="img-fluid h-100 w-100 object-fit-cover"
                                                    onError={(e) => {
                                                        e.target.src = '/assets/images/default-avatar.jpg';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h5 className="mb-1 fw-bold">{testimonial.name}</h5>
                                                <p className="text-muted small mb-0">{testimonial.role}</p>
                                            </div>
                                        </div>

                                        <Card.Text className="mb-4 fst-italic position-relative z-1">
                                            "{testimonial.text}"
                                        </Card.Text>

                                        <div className="d-flex justify-content-between align-items-center position-relative z-1">
                                            <div className="d-flex" style={{ fontSize: '1.2rem' }}>
                                                {renderStars(testimonial.rating)}
                                                <span className="ms-2 text-muted small">{testimonial.rating}.0</span>
                                            </div>
                                            <div className="text-primary small">
                                                Verified Client
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        ))}
                    </Slider>
                </motion.div>
            </Container>

            {/* Embedded CSS */}
            <style>{`
                .testimonials-section {
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

                .testimonials-wrapper {
                    position: relative;
                    z-index: 2;
                    background-color: rgba(255, 255, 255, 0.85);
                    border-radius: 12px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                }

                .slick-slide > div {
                    padding: 10px;
                }
            `}</style>
        </div>
    );
};

export default Testimonials;
