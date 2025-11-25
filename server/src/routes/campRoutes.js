const express = require('express');
const { createCamp, listCamps, applyToCamp, updateApplicantStatus } = require('../controllers/campController');
const withAuth = require('../middleware/auth');

const router = express.Router();

router.get('/', withAuth('cadet', 'ano', 'admin'), listCamps);
router.post('/', withAuth('ano', 'admin'), createCamp);
router.post('/:campId/apply', withAuth('cadet'), applyToCamp);
router.patch('/:campId/applicants/:cadetId', withAuth('ano', 'admin'), updateApplicantStatus);

module.exports = router;

