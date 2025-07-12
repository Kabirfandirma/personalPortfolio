import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Gallery = () => {
    const designs = [
        { id: 1, title: "Masa Spot Flyer", img: "/assets/images/masa.png" },
        { id: 2, title: "Poster Design", img: "/assets/images/poster.jpg" },
        { id: 3, title: "Brand Identity", img: "/assets/images/sabil.png" },
        { id: 3, title: "Brand Identity", img: "/assets/images/book.png" },
        { id: 3, title: "Brand Identity", img: "/assets/images/amina.jpg" },
        // Add more designs as needed
    ];

    // Slideshow settings
    const sliderSettings = {
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
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-5">My Design Gallery</h2>

            {/* Slideshow Section */}
            <div className="mb-5">
                <Slider {...sliderSettings}>
                    {designs.map((item) => (
                        <div key={`slider-${item.id}`} className="px-2">
                            <Card className="border-0 shadow-sm h-100">
                                <div style={{
                                    position: 'relative',
                                    paddingBottom: '100%',
                                    overflow: 'hidden'
                                }}>
                                    <Card.Img
                                        variant="top"
                                        src={process.env.PUBLIC_URL + item.img}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Grid Layout Section */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {designs.map((item) => (
                    <Col key={item.id}>
                        <Card className="h-100 border-0 shadow-sm">
                            <div style={{
                                position: 'relative',
                                paddingBottom: '100%',
                                overflow: 'hidden'
                            }}>
                                <Card.Img
                                    variant="top"
                                    src={process.env.PUBLIC_URL + item.img}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = process.env.PUBLIC_URL + "/assets/images/placeholder.jpg";
                                    }}
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{item.title}</Card.Title>
                                <Link
                                    to={`/design/${item.id}`}
                                    className="btn btn-outline-primary btn-sm mt-auto"
                                >
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Gallery;