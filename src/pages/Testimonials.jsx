import { Container, Card } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaQuoteLeft, FaStar, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Testimonials = () => {
    // Testimonial data with client photos
    const testimonials = [
        {
            id: 1,
            name: "Mr. Elkanah",
            role: "Marketing Director",
            text: "Kabir's designs transformed our brand identity. His attention to detail and creative vision exceeded our expectations.",
            rating: 5,
            photo: "/assets/images/clients/elkanah.jpg" // Add client photos
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
    ];

    // Animation hook
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    // Enhanced slider settings
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
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Star rating component with half-star capability
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
                <span key={i} className="position-relative">
                    {rating >= starValue ? (
                        <FaStar className="text-warning" />
                    ) : (
                        <FaRegStar className="text-warning opacity-25" />
                    )}
                </span>
            );
        });
    };

    return (
        <Container fluid className="py-5 bg-light" id="testimonials">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="container"
            >
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">Client Testimonials</h2>
                    <p className="lead text-muted">What my clients say about my work</p>
                </div>

                <Slider {...settings}>
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            whileHover={{ scale: 1.02 }}
                            className="px-3"
                        >
                            <Card className="border-0 shadow-sm h-100 overflow-hidden">
                                <Card.Body className="p-4 position-relative">
                                    {/* Decorative element */}
                                    <div className="position-absolute top-0 start-0 w-100 bg-primary" style={{ height: '4px' }}></div>

                                    {/* Quote icon with animation */}
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mb-4 text-primary opacity-10"
                                        style={{ fontSize: '4rem', position: 'absolute', top: '10px', right: '20px', zIndex: 0 }}
                                    >
                                        <FaQuoteLeft />
                                    </motion.div>

                                    {/* Client photo */}
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

                                    {/* Testimonial text */}
                                    <Card.Text className="mb-4 fst-italic position-relative z-1">
                                        "{testimonial.text}"
                                    </Card.Text>

                                    {/* Rating */}
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
    );
};

export default Testimonials;