const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup); // ✅ POST
router.post('/login', login);   // ✅ POST

module.exports = router;
