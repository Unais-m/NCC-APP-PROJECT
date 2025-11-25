const express = require('express');
const { register, login, logout, me, updateProfile } = require('../controllers/authController');
const withAuth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', withAuth(), logout);
router.get('/me', withAuth(), me);
router.put('/me', withAuth(), updateProfile);

module.exports = router;

