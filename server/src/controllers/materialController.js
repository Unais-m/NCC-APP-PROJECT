const Material = require('../models/Material');
const asyncHandler = require('../utils/asyncHandler');

const createMaterial = asyncHandler(async (req, res) => {
  const material = await Material.create({
    ...req.body,
    uploadedBy: req.user._id,
  });
  res.status(201).json({ material });
});

const listMaterials = asyncHandler(async (req, res) => {
  const filters = {};
  if (req.query.category) filters.category = req.query.category;
  if (req.query.branch) filters.branch = req.query.branch;

  const materials = await Material.find(filters).sort({ createdAt: -1 });
  res.json({ materials });
});

module.exports = { createMaterial, listMaterials };

