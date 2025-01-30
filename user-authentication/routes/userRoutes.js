const express = require('express');
const { signup, signin } = require('../controllers/userController');

const router = express.Router();

// POST route for sign-up
router.post('/signup', signup);

// POST route for sign-in
router.post('/signin', signin);

module.exports = router;