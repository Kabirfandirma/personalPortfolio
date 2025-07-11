import { Container, Card } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Gallery = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,          // Enable auto-play
        autoplaySpeed: 3000,     // 3 seconds between transitions
        pauseOnHover: true,      // Pause on mouse hover
        arrows: true,            // Show navigation arrows
        nextArrow: <button className="slick-next">Next</button>,
        prevArrow: <button className="slick-prev">Prev</button>,
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    const designs = [
        { id: 1, title: "Masa Spot Flyer", img: "/assets/images/masa.png" },
        { id: 2, title: "Poster Design", img: "/assets/images/poster.jpg" },
        { id: 3, title: "Brand Identity", img: "/assets/images/sabil.png" },
    ];

    return (
        <Container className="my-5">
            <h2 className="text-center mb-5">My Design Gallery</h2>
            <Slider {...settings}>
                {designs.map((item) => (
                    <div key={item.id} className="px-2">
                        <Card className="border-0 shadow-sm" style={{ aspectRatio: '1/1' }}>
                            <div className="square-image-container">
                                <Card.Img
                                    variant="top"
                                    src={item.img}
                                    className="square-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/assets/images/placeholder.jpg";
                                    }}
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="mt-auto">{item.title}</Card.Title>
                                <Link
                                    to={`/design/${item.id}`}
                                    className="btn btn-outline-primary btn-sm mt-2"
                                >
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Slider>
        </Container>
    );
};

export default Gallery;