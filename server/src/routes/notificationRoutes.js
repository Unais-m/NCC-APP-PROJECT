const express = require('express');
const { createNotification, listNotifications, markRead } = require('../controllers/notificationController');
const withAuth = require('../middleware/auth');

const router = express.Router();

router.get('/', withAuth('cadet', 'ano', 'admin'), listNotifications);
router.post('/', withAuth('ano', 'admin'), createNotification);
router.post('/:id/read', withAuth('cadet', 'ano', 'admin'), markRead);

module.exports = router;

