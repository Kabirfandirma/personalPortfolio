import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft, FaStar, FaRegStar, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollReveal";
import {
  InteractiveCard,
  InteractiveButton,
  GlassCard,
} from "../components/InteractiveElements";
import { useIntersectionObserver } from "../hooks/useCustomHooks";
import AnimatedText from "../components/AnimatedText";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Mr. Elkanah",
      role: "Marketing Director",
      text: "Kabir's designs transformed our brand identity. His attention to detail and creative vision exceeded our expectations. The final deliverables were absolutely stunning!",
      rating: 5,
      photo: "/assets/images/clients/elkanah.jpg",
      company: "TechCorp Solutions",
    },
    {
      id: 2,
      name: "Mrs. Confidence",
      role: "Startup Founder",
      text: "Working with Kabir was a pleasure. He delivered our project on time and with exceptional quality. His professionalism and creativity are unmatched.",
      rating: 5,
      photo: "/assets/images/clients/confidence.jpg",
      company: "InnovatePlus",
    },
    {
      id: 3,
      name: "Mr. Abubakar",
      role: "Art Director",
      text: "One of the most talented graphic designers I've collaborated with. Highly recommended! His ability to understand and execute our vision was remarkable.",
      rating: 5,
      photo: "/assets/images/clients/mukhtar.jpg",
      company: "Creative Studios",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
    company: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [] = useIntersectionObserver({ threshold: 0.1 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.text.trim()) newErrors.text = "Testimonial text is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTestimonial = {
        ...formData,
        id: testimonials.length + 1,
        photo: "/assets/images/clients/default.jpg",
      };
      setTestimonials((prev) => [...prev, newTestimonial]);
      setFormData({ name: "", role: "", text: "", rating: 5, company: "" });
      setShowForm(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span
        key={index}
        whileHover={{ scale: 1.2 }}
        style={{ color: index < rating ? "#ffc107" : "#e4e5e9" }}
      >
        {index < rating ? <FaStar /> : <FaRegStar />}
      </motion.span>
    ));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  // Animation variants
  const testimonialVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const quoteVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, delay: 0.3 },
    },
  };

  return (
    <div className="testimonials-page">
      <Container className="py-5">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-5">
            <AnimatedText
              text="What Clients Say"
              element="h1"
              className="display-4 fw-bold mb-3"
              animationType="words"
              enableHover={true}
            />
            <AnimatedText
              text="Real feedback from satisfied clients who trusted me with their projects"
              element="p"
              className="lead"
              delay={0.3}
            />
          </div>
        </ScrollReveal>

        {/* Success Message */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="alert alert-success text-center mb-4"
              style={{
                background: "linear-gradient(45deg, #28a745, #20c997)",
                border: "none",
                borderRadius: "12px",
                color: "white",
              }}
            >
              Thank you for your testimonial! It has been added successfully.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Slider */}
        <ScrollReveal className="mb-5">
          <GlassCard className="p-4">
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-2">
                  <motion.div
                    variants={testimonialVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <InteractiveCard className="h-100 border-0">
                      <GlassCard className="p-4 h-100">
                        <div className="position-relative">
                          <motion.div
                            variants={quoteVariants}
                            initial="hidden"
                            animate="visible"
                            className="position-absolute"
                            style={{
                              top: "-10px",
                              left: "-10px",
                              fontSize: "3rem",
                              color: "var(--primary)",
                              opacity: 0.3,
                            }}
                          >
                            <FaQuoteLeft />
                          </motion.div>

                          <div className="text-center mb-3">
                            <motion.div
                              className="d-inline-block"
                              whileHover={{ scale: 1.1 }}
                            >
                              <img
                                src={process.env.PUBLIC_URL + testimonial.photo}
                                alt={testimonial.name}
                                className="rounded-circle"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  border: "3px solid var(--primary)",
                                }}
                              />
                            </motion.div>
                          </div>

                          <blockquote className="text-center mb-3">
                            <p className="mb-0 fst-italic">
                              "{testimonial.text}"
                            </p>
                          </blockquote>

                          <div className="text-center mb-3">
                            <div className="d-flex justify-content-center mb-2">
                              {renderStars(testimonial.rating)}
                            </div>
                          </div>

                          <div className="text-center">
                            <motion.h6
                              className="fw-bold mb-1"
                              whileHover={{ color: "var(--primary)" }}
                            >
                              {testimonial.name}
                            </motion.h6>
                            <p className="text-muted mb-1">
                              {testimonial.role}
                            </p>
                            <small className="text-primary fw-semibold">
                              {testimonial.company}
                            </small>
                          </div>
                        </div>
                      </GlassCard>
                    </InteractiveCard>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </GlassCard>
        </ScrollReveal>

        {/* Stats Section */}
        <ScrollReveal className="mb-5">
          <StaggerContainer>
            <Row className="text-center">
              {[
                { number: "50+", label: "Happy Clients", icon: "😊" },
                { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
                { number: "100+", label: "Projects Completed", icon: "🎨" },
                { number: "24/7", label: "Support Available", icon: "💬" },
              ].map((stat, index) => (
                <Col md={3} key={index} className="mb-4">
                  <StaggerItem>
                    <GlassCard className="p-4 text-center h-100">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="mb-3"
                        style={{ fontSize: "3rem" }}
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.h3
                        className="display-6 fw-bold text-primary mb-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.number}
                      </motion.h3>
                      <p className="mb-0 fw-semibold">{stat.label}</p>
                    </GlassCard>
                  </StaggerItem>
                </Col>
              ))}
            </Row>
          </StaggerContainer>
        </ScrollReveal>

        {/* Add Testimonial Section */}
        <ScrollReveal>
          <div className="text-center">
            <GlassCard className="p-5">
              <AnimatedText
                text="Share Your Experience"
                element="h3"
                className="h2 mb-3"
                animationType="words"
              />
              <p className="lead mb-4">
                Have you worked with me? I'd love to hear about your experience!
              </p>

              <AnimatePresence>
                {!showForm ? (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <InteractiveButton
                      onClick={() => setShowForm(true)}
                      className="btn btn-primary btn-lg px-5"
                    >
                      <FaPlus className="me-2" />
                      Add Your Testimonial
                    </InteractiveButton>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Form onSubmit={handleSubmit} className="text-start">
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={handleInputChange}
                              isInvalid={!!errors.name}
                              className="glass-input"
                              style={{
                                background: "var(--glass-bg)",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "12px",
                                padding: "12px",
                                backdropFilter: "blur(10px)",
                                color: "var(--text-primary)",
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              name="role"
                              placeholder="Your Role"
                              value={formData.role}
                              onChange={handleInputChange}
                              isInvalid={!!errors.role}
                              className="glass-input"
                              style={{
                                background: "var(--glass-bg)",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "12px",
                                padding: "12px",
                                backdropFilter: "blur(10px)",
                                color: "var(--text-primary)",
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.role}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          name="company"
                          placeholder="Company Name"
                          value={formData.company}
                          onChange={handleInputChange}
                          isInvalid={!!errors.company}
                          className="glass-input"
                          style={{
                            background: "var(--glass-bg)",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "12px",
                            padding: "12px",
                            backdropFilter: "blur(10px)",
                            color: "var(--text-primary)",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.company}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="text"
                          placeholder="Share your experience working with me..."
                          value={formData.text}
                          onChange={handleInputChange}
                          isInvalid={!!errors.text}
                          style={{
                            background: "var(--glass-bg)",
                            border: "1px solid var(--glass-border)",
                            borderRadius: "12px",
                            padding: "15px",
                            backdropFilter: "blur(10px)",
                            color: "var(--text-primary)",
                            resize: "vertical",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.text}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Rating</Form.Label>
                        <div className="d-flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              className="btn p-0 border-0 bg-transparent"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  rating: star,
                                }))
                              }
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              style={{
                                color:
                                  star <= formData.rating
                                    ? "#ffc107"
                                    : "#e4e5e9",
                                fontSize: "1.5rem",
                              }}
                            >
                              <FaStar />
                            </motion.button>
                          ))}
                        </div>
                      </Form.Group>

                      <div className="d-flex gap-3">
                        <InteractiveButton
                          type="submit"
                          className="btn btn-primary"
                        >
                          Submit Testimonial
                        </InteractiveButton>
                        <InteractiveButton
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="btn btn-outline-secondary"
                        >
                          Cancel
                        </InteractiveButton>
                      </div>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
};

export default Testimonials;
