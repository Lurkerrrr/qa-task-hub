const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');
const verifyToken = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

router.get('/', verifyToken, bugController.getBugs);

// Requires both authentication token and valid payload to create a bug
router.post('/', verifyToken, validate('bug'), bugController.createBug);

module.exports = router;