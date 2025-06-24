const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');

// Load environment variables
dotenv.config();

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use EJS layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Refers to views/layout.ejs

// Session
app.use(session({
  secret: 'sirl4rrysecret',
  resave: false,
  saveUninitialized: true
}));

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.messages = req.session.messages || {};
  req.session.messages = {};
  next();
});

// Sample data and dummy routes
const photos = [
  { title: 'Wedding Bliss', imageUrl: '/images/sample1.jpg', category: 'Wedding' },
  { title: 'Nature Walk', imageUrl: '/images/sample2.jpg', category: 'Nature' },
];
const packages = [
  { _id: 1, name: 'Basic', price: 5000, description: '1-hour shoot', duration: '1hr' },
  { _id: 2, name: 'Premium', price: 10000, description: '2-hour shoot + edits', duration: '2hrs' },
];

// Routes
app.get('/', (req, res) => {
  res.render('home', { photos });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio', { photos });
});

app.get('/packages', (req, res) => {
  res.render('packages', { packages });
});

app.get('/bookings/new', (req, res) => {
  res.render('booking', { packages });
});

app.post('/bookings/new', (req, res) => {
  req.session.messages.success = 'Booking received! We’ll contact you shortly.';
  res.redirect('/');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  req.session.messages.success = 'Message sent! We’ll get back to you soon.';
  res.redirect('/');
});

app.get('/admin/login', (req, res) => {
  res.render('admin-login');
});

// Launch server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



