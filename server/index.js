const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const Property = require('./models/property');
const Rental = require('./models/Rental'); // 👈 NEW: Import Rental model

const app = express();
const PORT = 4000;

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// MongoDB connection
mongoose
  .connect('mongodb+srv://admin:test@cluster0.xnvxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// User model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', UserSchema);

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// ========== SELL/BUY ROUTES ==========

// POST - Sell Property
app.post('/api/sell', upload.single('imageFile'), async (req, res) => {
  try {
    const {
      title, location, size, price,
      contactName, contactEmail, contactPhone, description,
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newProperty = new Property({
      title, location, size, price,
      contactName, contactEmail, contactPhone,
      image, description,
    });

    await newProperty.save();
    res.status(201).json({ message: 'Property saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save property' });
  }
});

// GET - Buy Properties
app.get('/api/buy', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// ========== RENT/RENTER ROUTES ==========

// POST - Renter Listing
app.post('/api/rent', upload.single('imageFile'), async (req, res) => {
  try {
    const {
      title, address, size, price,
      contactName, contactEmail, contactPhone,
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newRental = new Rental({
      title,
      address,
      size,
      pricePerMonth: price,
      contactName,
      contactEmail,
      contactPhone,
      image,
    });

    await newRental.save();
    res.status(201).json({ message: 'Rental listing created successfully' });
  } catch (error) {
    console.error('Error saving rental listing:', error);
    res.status(500).json({ error: 'Failed to save rental listing' });
  }
});

// GET - Rental Listings
app.get('/api/rent', async (req, res) => {
  try {
    const rentals = await Rental.find().sort({ createdAt: -1 });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
