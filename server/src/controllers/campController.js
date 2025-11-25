const Camp = require('../models/Camp');
const asyncHandler = require('../utils/asyncHandler');

const createCamp = asyncHandler(async (req, res) => {
  const camp = await Camp.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ camp });
});

const listCamps = asyncHandler(async (req, res) => {
  const camps = await Camp.find().sort({ startDate: 1 });
  res.json({ camps });
});

const applyToCamp = asyncHandler(async (req, res) => {
  const { campId } = req.params;
  const camp = await Camp.findById(campId);
  if (!camp) {
    return res.status(404).json({ message: 'Camp not found' });
  }

  const already = camp.applicants.find((a) => String(a.cadet) === String(req.user._id));
  if (already) {
    return res.status(409).json({ message: 'Already applied' });
  }

  camp.applicants.push({ cadet: req.user._id, status: 'pending' });
  await camp.save();
  res.json({ camp });
});

const updateApplicantStatus = asyncHandler(async (req, res) => {
  const { campId, cadetId } = req.params;
  const { status } = req.body;
  const camp = await Camp.findById(campId);
  if (!camp) {
    return res.status(404).json({ message: 'Camp not found' });
  }

  const applicant = camp.applicants.find((a) => String(a.cadet) === cadetId);
  if (!applicant) {
    return res.status(404).json({ message: 'Applicant not found' });
  }

  applicant.status = status;
  await camp.save();
  res.json({ camp });
});

module.exports = {
  createCamp,
  listCamps,
  applyToCamp,
  updateApplicantStatus,
};

