import { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/testimonial')
            .then(res => res.json())
            .then(data => setTestimonials(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container className="my-5">
            <h2 className="text-center mb-5">What Clients Say</h2>
            {testimonials.map((review, i) => (
                <Card key={i} className="mb-3 shadow-sm">
                    <Card.Body>
                        <div className="text-warning mb-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <Card.Text className="fst-italic">"{review.message}"</Card.Text>
                        <Card.Footer className="bg-transparent">{review.name}</Card.Footer>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default Testimonials;
