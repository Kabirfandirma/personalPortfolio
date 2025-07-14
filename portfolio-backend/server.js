import AdminTestimonials from './components/pages/Testimonials.jsx';

<Route path="/admin/testimonials" element={<AdminTestimonials />} />


const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`JSON DB server running on port ${PORT}`));