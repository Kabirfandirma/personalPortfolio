import { useState, useRef, useTransition } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollReveal";
import {
  InteractiveButton,
  GlassCard,
} from "../components/InteractiveElements";
import AnimatedText from "../components/AnimatedText";

// Email connection
const SERVICE_ID = "service_hakfzwk";
const TEMPLATE_ID = "template_qsh926g";
const PUBLIC_KEY = "wUVm81MUQAJNox6vu";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    startTransition(() => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setShowSuccess(false), 5000);
      } catch (error) {
        console.error("Error sending email:", error);
        setErrors({ submit: "Failed to send message. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "kafaan1980@gmail.com",
      color: "#6a11cb",
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+234 7039350100",
      color: "#2575fc",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Abuja, Nigeria",
      color: "#ff6b6b",
    },
  ];

  return (
    <div className="contact-page">
      <Container className="py-5">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-5">
            <AnimatedText
              text="Let's Work Together"
              element="h1"
              className="display-4 fw-bold mb-3"
              animationType="words"
              enableHover={true}
            />
            <AnimatedText
              text="Ready to bring your creative vision to life? Get in touch!"
              element="p"
              className="lead"
              delay={0.3}
            />
          </div>
        </ScrollReveal>

        <Row className="g-5 align-items-start">
          {/* Contact Form */}
          <Col lg={7}>
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <GlassCard className="p-4">
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="alert alert-success d-flex align-items-center mb-4"
                      style={{
                        background: "linear-gradient(45deg, #28a745, #20c997)",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    >
                      <FaCheckCircle className="me-2" />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>

                <Form ref={formRef} onSubmit={handleSubmit}>
                  <StaggerContainer>
                    <Row>
                      <Col md={6}>
                        <StaggerItem>
                          <Form.Group className="mb-4">
                            <motion.div
                              className="position-relative"
                              whileFocus={{ scale: 1.02 }}
                            >
                              <FaUser
                                className="position-absolute"
                                style={{
                                  top: "50%",
                                  left: "15px",
                                  transform: "translateY(-50%)",
                                  color: "var(--primary)",
                                  zIndex: 1,
                                }}
                              />
                              <Form.Control
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                className="glass-input"
                                style={{
                                  background: "var(--glass-bg)",
                                  border: "1px solid var(--glass-border)",
                                  borderRadius: "12px",
                                  paddingLeft: "45px",
                                  paddingTop: "12px",
                                  paddingBottom: "12px",
                                  backdropFilter: "blur(10px)",
                                  color: "var(--text-primary)",
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.name}
                              </Form.Control.Feedback>
                            </motion.div>
                          </Form.Group>
                        </StaggerItem>
                      </Col>
                      <Col md={6}>
                        <StaggerItem>
                          <Form.Group className="mb-4">
                            <motion.div
                              className="position-relative"
                              whileFocus={{ scale: 1.02 }}
                            >
                              <FaEnvelope
                                className="position-absolute"
                                style={{
                                  top: "50%",
                                  left: "15px",
                                  transform: "translateY(-50%)",
                                  color: "var(--primary)",
                                  zIndex: 1,
                                }}
                              />
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                className="glass-input"
                                style={{
                                  background: "var(--glass-bg)",
                                  border: "1px solid var(--glass-border)",
                                  borderRadius: "12px",
                                  paddingLeft: "45px",
                                  paddingTop: "12px",
                                  paddingBottom: "12px",
                                  backdropFilter: "blur(10px)",
                                  color: "var(--text-primary)",
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </motion.div>
                          </Form.Group>
                        </StaggerItem>
                      </Col>
                    </Row>

                    <StaggerItem>
                      <Form.Group className="mb-4">
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            name="message"
                            placeholder="Tell me about your project..."
                            value={formData.message}
                            onChange={handleChange}
                            isInvalid={!!errors.message}
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
                            {errors.message}
                          </Form.Control.Feedback>
                        </motion.div>
                      </Form.Group>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="d-grid">
                        <InteractiveButton
                          type="submit"
                          disabled={isSubmitting || isPending}
                          className="btn btn-primary btn-lg"
                          style={{
                            background: "var(blue)",
                            border: "none",
                            borderRadius: "12px",
                            padding: "15px",
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.span
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <FaSpinner className="spinner-border-sm me-2" />
                                Sending...
                              </motion.span>
                            ) : (
                              <motion.span
                                key="send"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <FaPaperPlane className="me-2" />
                                Send Message
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </InteractiveButton>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </Form>
              </GlassCard>
            </motion.div>
          </Col>

          {/* Contact Info */}
          <Col lg={5}>
            <motion.div
              variants={infoVariants}
              initial="hidden"
              animate="visible"
            >
              <StaggerContainer>
                <div className="mb-4">
                  <AnimatedText
                    text="Get In Touch"
                    element="h3"
                    className="h2 mb-3"
                    animationType="words"
                  />
                  <p className="lead">
                    I'm always excited to work on new projects and collaborate
                    with creative minds.
                  </p>
                </div>

                {contactInfo.map((info, index) => (
                  <StaggerItem key={index}>
                    <GlassCard className="p-4 mb-3">
                      <motion.div
                        className="d-flex align-items-center"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <motion.div
                          className="contact-icon me-3"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "12px",
                            background: `linear-gradient(45deg, ${info.color}, var(--secondary))`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <info.icon size={20} />
                        </motion.div>
                        <div>
                          <h6 className="fw-bold mb-1">{info.title}</h6>
                          <p className="mb-0 text-muted">{info.value}</p>
                        </div>
                      </motion.div>
                    </GlassCard>
                  </StaggerItem>
                ))}

                <StaggerItem>
                  <GlassCard className="p-4 text-center">
                    <AnimatedText
                      text="Let's Create Something Amazing"
                      element="h4"
                      className="mb-3"
                      animationType="words"
                    />
                    <p className="text-muted mb-0">
                      Whether it's branding, web design, or print materials, I'm
                      here to help bring your vision to life.
                    </p>
                  </GlassCard>
                </StaggerItem>
              </StaggerContainer>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
