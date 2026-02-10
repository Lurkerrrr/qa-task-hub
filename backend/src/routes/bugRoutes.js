const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, bugController.getBugs);
router.post('/', verifyToken, bugController.createBug);

module.exports = router;