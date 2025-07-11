import { Container, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const Contact = () => {
    const formik = useFormik({
        initialValues: { name: '', email: '', message: '' },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            message: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            // Integrate EmailJS here later
        },
    });

    return (
        <Container className="my-5">
            <h2 className="text-center mb-5">Get In Touch</h2>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        isInvalid={formik.touched.name && formik.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        isInvalid={formik.touched.message && formik.errors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <motion.div whileHover={{ scale: 1.02 }}>
                    <Button variant="primary" type="submit" className="w-100">
                        Send Message
                    </Button>
                </motion.div>
            </Form>
        </Container>
    );
};

export default Contact;