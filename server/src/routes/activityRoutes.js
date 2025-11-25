const express = require('express');
const {
  createActivity,
  listActivities,
  updateActivityStatus,
  getActivitySummary,
} = require('../controllers/activityController');
const withAuth = require('../middleware/auth');

const router = express.Router();

router.post('/', withAuth('cadet', 'ano', 'admin'), createActivity);
router.get('/', withAuth('cadet', 'ano', 'admin'), listActivities);
router.get('/summary', withAuth('cadet', 'ano', 'admin'), getActivitySummary);
router.patch('/:id', withAuth('ano', 'admin'), updateActivityStatus);

module.exports = router;

