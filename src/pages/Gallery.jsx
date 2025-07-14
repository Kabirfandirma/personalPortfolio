import { useMemo, useState } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Gallery = () => {
    const [loadingStates, setLoadingStates] = useState({});
    const [activeFilter, setActiveFilter] = useState('All');

    const designs = useMemo(() => [
        { id: 1, title: "Masa Spot Flyer", img: "/assets/images/masa.png", category: "Flyer" },
        { id: 2, title: "Poster Design", img: "/assets/images/poster.jpg", category: "Poster" },
        { id: 3, title: "Brand Identity", img: "/assets/images/sabil.png", category: "Branding" },
        { id: 4, title: "Book Cover", img: "/assets/images/book.png", category: "Print" },
        { id: 5, title: "Amina Collection", img: "/assets/images/amina.jpg", category: "Branding" },
    ], []);

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

    const renderImageCard = (item, isSlider = false) => (
        <Card className={`border-0 shadow-sm h-100 ${isSlider ? 'mx-2' : ''}`}>
            <div style={{
                position: 'relative',
                paddingBottom: '100%',
                overflow: 'hidden',
                backgroundColor: '#f8f9fa'
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
                        backgroundColor: '#f8f9fa'
                    }}>
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}
                <img
                    src={process.env.PUBLIC_URL + item.img}
                    alt={item.title}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        display: loadingStates[item.id] === false ? 'block' : 'none'
                    }}
                    onLoad={() => handleImageLoad(item.id)}
                    onError={(e) => handleImageError(e, item.id)}
                />
            </div>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                    <Card.Title className="mb-2">{item.title}</Card.Title>
                    <span className="badge bg-primary">{item.category}</span>
                </div>
                <Link
                    to={`/design/${item.id}`}
                    className="btn btn-outline-primary btn-sm mt-auto align-self-start"
                >
                    View Details
                </Link>
            </Card.Body>
        </Card>
    );

    return (
        <div className="gallery-section">
            <div className="overlay" />

            <Container className="my-5 gallery-wrapper">
                <h2 className="text-center mb-5 display-5 fw-bold">My Design Portfolio</h2>

                {/* Featured Slideshow */}
                <section className="mb-5">
                    <h3 className="mb-4 text-center">Featured Works</h3>
                    <Slider {...sliderSettings}>
                        {designs.map((item) => (
                            <div key={`slider-${item.id}`}>
                                {renderImageCard(item, true)}
                            </div>
                        ))}
                    </Slider>
                </section>

                {/* Gallery Grid */}
                <section>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>All Projects</h3>
                        <div className="btn-group">
                            {['All', 'Branding', 'Print', 'Flyer', 'Poster'].map(filter => (
                                <button
                                    key={filter}
                                    className={`btn btn-outline-secondary btn-sm ${activeFilter === filter ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {filteredDesigns.map((item) => (
                            <Col key={item.id}>
                                {renderImageCard(item)}
                            </Col>
                        ))}
                    </Row>
                </section>
            </Container>

            {/* Embedded CSS */}
            <style>{`
                .gallery-section {
                    background-image: url(${process.env.PUBLIC_URL}/images/big2.gif);
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    min-height: 100vh;
                    position: relative;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.2);
                    z-index: 1;
                }

                .gallery-wrapper {
                    position: relative;
                    z-index: 2;
                    background-color: rgba(255, 255, 255, 0.87);
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
                }

                .card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }

                .slick-slide > div {
                    padding: 0 10px;
                }

                .slick-list {
                    margin: 0 -10px;
                }

                .badge {
                    font-size: 0.7rem;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

export default Gallery;
