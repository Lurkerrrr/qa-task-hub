const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

// Validates the request body before passing it to the controller
router.post('/register', validate('register'), authController.register);
router.post('/login', validate('login'), authController.login);

module.exports = router;