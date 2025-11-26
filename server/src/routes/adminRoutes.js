const express = require('express');
const { listCadets, updateRole, adminStats } = require('../controllers/adminController');
const withAuth = require('../middleware/auth');

const router = express.Router();

router.use(withAuth('admin'));

router.get('/cadets', listCadets);
router.patch('/cadets/:id/role', updateRole);
router.get('/stats', adminStats);

module.exports = router;



