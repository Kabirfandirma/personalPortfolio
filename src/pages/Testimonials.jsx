import { Container, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Mr Elkanahh", text: "Kabir's work is exceptional!", rating: 5 },
        { id: 2, name: "Mrs Confidence", text: "Highly recommend for branding projects.", rating: 4 },
    ];

    return (
        <Container className="my-5">
            <h2 className="text-center mb-5">What Clients Say</h2>
            {reviews.map((review) => (
                <Card key={review.id} className="mb-3 shadow-sm">
                    <Card.Body>
                        <div className="text-warning mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <Card.Text className="fst-italic">"{review.text}"</Card.Text>
                        <Card.Footer className="bg-transparent">{review.name}</Card.Footer>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default Testimonials;