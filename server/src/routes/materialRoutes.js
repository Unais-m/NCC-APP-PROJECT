const express = require('express');
const { createMaterial, listMaterials } = require('../controllers/materialController');
const withAuth = require('../middleware/auth');

const router = express.Router();

router.get('/', withAuth('cadet', 'ano', 'admin'), listMaterials);
router.post('/', withAuth('ano', 'admin'), createMaterial);

module.exports = router;

