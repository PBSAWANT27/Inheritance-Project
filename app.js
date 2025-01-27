const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');  // Path to your User model

const app = express();
app.use(express.json());  // To parse JSON in the request body

// Connect to MongoDB (replace the connection string with your own)
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.log('MongoDB connection error:', error);
});

// POST route to create a new user
app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists.' });
    }

    // Create a new user
    const newUser = new User({ email, username, password });
    
    // Save the new user
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const express = require('express');
// const app = express();
// const authRoutes = require('./routes/authRoutes');

// app.use(express.json());  // for parsing application/json

// // Mount the auth routes at /api/auth
// app.use('/api/auth', authRoutes);

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');

// dotenv.config(); // Load environment variables

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json()); // Parse JSON requests

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log('MongoDB connection error: ', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });