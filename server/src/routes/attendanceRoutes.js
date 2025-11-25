const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const withAuth = require('../middleware/auth');

const router = express.Router();

router.post('/', withAuth('ano', 'admin'), markAttendance);
router.get('/:campId', withAuth('ano', 'admin'), getAttendance);

module.exports = router;

