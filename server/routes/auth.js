const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}), async (req, res) => {
  try {
    // Log the user data received from Google
    console.log('Google User:', req.user);

    // Check if the user already exists in the database
    let user = await User.findOne({ email: req.user.email });

    // If the user doesn't exist, create a new user
    if (!user) {
      console.log('Creating new user');
      console.log(req.user);
      console.log(req.user.given_name);
      console.log(req.user.family_name);
      console.log(req.user.email);
      console.log(req.user.picture);
      console.log(req.user.accountType);
      console.log(req.user.isVerified);
      user = new User({
        firstName: req.user.given_name || 'DefaultFirstName', // Fallback if Google doesn't provide these
        lastName: req.user.family_name || 'DefaultLastName',
        email: req.user.email,
        password: 'GoogleAuth' + Math.random().toString(36).slice(-8), // Random password for OAuth users
        img: req.user.picture || `https://api.dicebear.com/5.x/initials/svg?seed=${req.user.given_name} ${req.user.family_name}`,
        accountType: 'Student', // Adjust according to your requirements
        isVerified: true,
        registrationNumber: 'NotProvided' // Set to a default if it's required
      });

      // Save the new user to the database
      await user.save();
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirect the user with the token
    res.redirect(`http://localhost:3000?token=${token}`);
  } catch (error) {
    console.error('Error during Google authentication callback:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Test route to check if authentication routes are working
router.get('/test', (req, res) => {
  res.send('Auth routes are working!');
});

// Test user creation route
router.post('/test-user-creation', async (req, res) => {
  try {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      password: 'TestPassword123',
      img: 'https://example.com/test-image.jpg',
      accountType: 'Student',
      isVerified: true
    };

    console.log('Creating test user with data:', userData);

    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: 'Test user created successfully', user });
  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
