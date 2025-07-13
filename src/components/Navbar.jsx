import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useMemo } from 'react';

const CustomNavbar = () => {
    // Using useMemo for potentially expensive styles calculation
    const navbarStyle = useMemo(() => ({
        backgroundColor: '#6a11cb',
        background: 'linear-gradient(to right, #261f2dff, #182336ff)' // Optional gradient enhancement
    }), []);

    const navItems = useMemo(() => [
        { path: '/', label: 'Home' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/testimonials', label: 'Testimonials' },
        { path: '/contact', label: 'Contact' }
    ], []);

    return (
        <Navbar
            style={navbarStyle}
            variant="dark"
            expand="lg"
            sticky="top"
            collapseOnSelect // Modern touch - collapses when item selected
        >
            <Container fluid="md"> {/* Better container control */}
                <Navbar.Brand as={Link} to="/" className="fw-bold">Kabir Fandirma</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {navItems.map((item) => (
                            <Nav.Link
                                key={item.path}
                                as={Link}
                                to={item.path}
                                eventKey={item.path} // For collapseOnSelect
                                className="px-3" // Better spacing
                            >
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;