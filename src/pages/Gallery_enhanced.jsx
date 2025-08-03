import { useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { InteractiveCard, GlassCard, InteractiveButton } from '../components/InteractiveElements';
import { LoadingSpinner } from '../components/LoadingComponents';
import AnimatedText from '../components/AnimatedText';

const Gallery = () => {
    const [loadingStates, setLoadingStates] = useState({});
    const [activeFilter, setActiveFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    const designs = useMemo(() => [
        { 
            id: 1, 
            title: "Masa Spot Flyer", 
            img: "/assets/images/masa.png", 
            category: "Flyer",
            description: "Modern restaurant promotional design"
        },
        { 
            id: 2, 
            title: "Poster Design", 
            img: "/assets/images/poster.jpg", 
            category: "Poster",
            description: "Eye-catching event poster"
        },
        { 
            id: 3, 
            title: "Brand Identity", 
            img: "/assets/images/sabil.png", 
            category: "Branding",
            description: "Complete brand identity package"
        },
        { 
            id: 4, 
            title: "Book Cover", 
            img: "/assets/images/book.png", 
            category: "Print",
            description: "Professional book cover design"
        },
        { 
            id: 5, 
            title: "Amina Collection", 
            img: "/assets/images/amina.jpg", 
            category: "Branding",
            description: "Fashion brand visual identity"
        },
    ], []);

    const categories = useMemo(() => 
        ['All', ...new Set(designs.map(item => item.category))], 
        [designs]
    );

    const filteredDesigns = useMemo(() => {
        return activeFilter === 'All'
            ? designs
            : designs.filter(item => item.category === activeFilter);
    }, [designs, activeFilter]);

    const handleImageLoad = (id) => {
        setLoadingStates(prev => ({ ...prev, [id]: false }));
    };

    const handleImageError = (e, id) => {
        e.target.onerror = null;
        e.target.src = process.env.PUBLIC_URL + "/assets/images/placeholder.jpg";
        setLoadingStates(prev => ({ ...prev, [id]: false }));
    };

    const handleFilterChange = (filter) => {
        setIsLoading(true);
        setActiveFilter(filter);
        setTimeout(() => setIsLoading(false), 300);
    };

    const sliderSettings = useMemo(() => ({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    }), []);

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: { 
            opacity: 0, 
            y: -50, 
            scale: 0.9,
            transition: { duration: 0.3 }
        }
    };

    const renderImageCard = (item, isSlider = false) => (
        <motion.div
            key={item.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className={isSlider ? 'px-2' : ''}
        >
            <InteractiveCard className="h-100 border-0">
                <GlassCard className="h-100">
                    <div style={{
                        position: 'relative',
                        paddingBottom: '75%',
                        overflow: 'hidden',
                        borderRadius: '12px 12px 0 0'
                    }}>
                        {loadingStates[item.id] !== false && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'var(--bg-secondary)'
                            }}>
                                <LoadingSpinner size="sm" />
                            </div>
                        )}
                        <motion.img
                            src={process.env.PUBLIC_URL + item.img}
                            alt={item.title}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: loadingStates[item.id] === false ? 'block' : 'none'
                            }}
                            onLoad={() => handleImageLoad(item.id)}
                            onError={(e) => handleImageError(e, item.id)}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        
                        <motion.div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                            style={{
                                background: 'rgba(106, 17, 203, 0.8)',
                                borderRadius: '12px 12px 0 0'
                            }}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.span
                                className="text-white fw-bold"
                                initial={{ y: 20 }}
                                whileHover={{ y: 0 }}
                            >
                                View Details
                            </motion.span>
                        </motion.div>
                    </div>
                    
                    <div className="p-4">
                        <motion.h5 
                            className="fw-bold mb-2"
                            whileHover={{ color: 'var(--primary)' }}
                        >
                            {item.title}
                        </motion.h5>
                        <p className="text-muted mb-2">{item.description}</p>
                        <motion.span 
                            className="badge text-white px-3 py-1"
                            style={{ 
                                background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                                borderRadius: '20px'
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {item.category}
                        </motion.span>
                    </div>
                </GlassCard>
            </InteractiveCard>
        </motion.div>
    );

    return (
        <div className="gallery-page">
            <Container className="py-5">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-5">
                        <AnimatedText
                            text="My Portfolio Gallery"
                            element="h1"
                            className="display-4 fw-bold mb-3"
                            animationType="words"
                            enableHover={true}
                        />
                        <AnimatedText
                            text="Explore my creative works and design projects"
                            element="p"
                            className="lead"
                            delay={0.3}
                        />
                    </div>
                </ScrollReveal>

                {/* Filter Tabs */}
                <ScrollReveal>
                    <div className="d-flex justify-content-center mb-5">
                        <div className="d-flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    className="btn glass-button"
                                    onClick={() => handleFilterChange(category)}
                                    style={{
                                        backgroundColor: activeFilter === category ? 'var(--primary)' : 'var(--glass-bg)',
                                        color: activeFilter === category ? '#fff' : 'var(--text-primary)',
                                        border: activeFilter === category ? '1px solid var(--primary)' : '1px solid var(--glass-border)'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Gallery Grid */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-5"
                        >
                            <LoadingSpinner />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="gallery"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <StaggerContainer>
                                <Row className="g-4">
                                    {filteredDesigns.map((item) => (
                                        <Col lg={4} md={6} key={item.id}>
                                            <StaggerItem>
                                                {renderImageCard(item)}
                                            </StaggerItem>
                                        </Col>
                                    ))}
                                </Row>
                            </StaggerContainer>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Featured Slider */}
                <ScrollReveal className="mt-5 pt-5">
                    <div className="text-center mb-4">
                        <AnimatedText
                            text="Featured Works"
                            element="h2"
                            className="h1 mb-3"
                            animationType="words"
                        />
                    </div>
                    
                    <GlassCard className="p-4">
                        <Slider {...sliderSettings}>
                            {designs.map((item) => renderImageCard(item, true))}
                        </Slider>
                    </GlassCard>
                </ScrollReveal>

                {/* CTA Section */}
                <ScrollReveal className="text-center mt-5 pt-5">
                    <GlassCard className="p-5">
                        <AnimatedText
                            text="Ready to Work Together?"
                            element="h3"
                            className="h2 mb-3"
                            animationType="words"
                        />
                        <p className="lead mb-4">
                            Let's bring your creative vision to life with stunning designs.
                        </p>
                        <InteractiveButton 
                            className="btn btn-primary btn-lg px-5"
                            onClick={() => window.location.href = '/contact'}
                        >
                            Start Your Project
                        </InteractiveButton>
                    </GlassCard>
                </ScrollReveal>
            </Container>
        </div>
    );
};

export default Gallery;
