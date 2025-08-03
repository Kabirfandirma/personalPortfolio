import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useScrollPosition } from '../hooks/useCustomHooks';

const CustomNavbar = () => {
    const location = useLocation();
    const scrollPosition = useScrollPosition();

    // Dynamic navbar styling based on scroll
    const navbarStyle = useMemo(() => ({
        backdropFilter: scrollPosition > 50 ? 'blur(20px)' : 'blur(10px)',
        backgroundColor: scrollPosition > 50 ? 'rgba(26, 26, 46, 0.9)' : 'rgba(26, 26, 46, 0.7)',
        boxShadow: scrollPosition > 50 ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'all 0.3s ease'
    }), [scrollPosition]);

    const navItems = useMemo(() => [
        { path: '/', label: 'Home' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/testimonials', label: 'Testimonials' },
        { path: '/contact', label: 'Contact' }
    ], []);

    const linkVariants = {
        inactive: { 
            scale: 1,
            color: '#ffffff'
        },
        active: { 
            scale: 1.05,
            color: '#6a11cb',
            textShadow: '0 0 8px rgba(106, 17, 203, 0.6)'
        },
        hover: {
            scale: 1.1,
            textShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
        }
    };

    return (
        <Navbar
            style={navbarStyle}
            variant="dark"
            expand="lg"
            fixed="top"
            collapseOnSelect
            className="navbar-glass"
        >
            <Container fluid="md">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Navbar.Brand 
                        as={Link} 
                        to="/" 
                        className="fw-bold"
                        style={{ 
                            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '1.5rem'
                        }}
                    >
                        Kabir Fandirma
                    </Navbar.Brand>
                </motion.div>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.path}
                                variants={linkVariants}
                                initial="inactive"
                                animate={location.pathname === item.path ? "active" : "inactive"}
                                whileHover="hover"
                            >
                                <Nav.Link
                                    as={Link}
                                    to={item.path}
                                    eventKey={item.path}
                                    className="px-3 fw-semibold position-relative"
                                    style={{ 
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {item.label}
                                    {location.pathname === item.path && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="position-absolute bottom-0 start-50 translate-middle-x"
                                            style={{
                                                width: '80%',
                                                height: '2px',
                                                background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                                                borderRadius: '2px'
                                            }}
                                        />
                                    )}
                                </Nav.Link>
                            </motion.div>
                        ))}
                        
                        <Nav.Item className="ms-3">
                            <ThemeToggle />
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;