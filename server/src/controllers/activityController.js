const Activity = require('../models/Activity');
const asyncHandler = require('../utils/asyncHandler');
const mongoose = require('mongoose');

const createActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.create({
    ...req.body,
    cadet: req.user.role === 'cadet' ? req.user._id : req.body.cadet,
  });
  res.status(201).json({ activity });
});

const listActivities = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === 'cadet') {
    filter.cadet = req.user._id;
  } else if (req.query.cadet) {
    filter.cadet = req.query.cadet;
  }

  if (req.query.type) {
    filter.type = req.query.type;
  }

  const activities = await Activity.find(filter).populate('cadet', 'name rollNumber role');
  res.json({ activities });
});

const updateActivityStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, points } = req.body;

  const activity = await Activity.findByIdAndUpdate(
    id,
    { status, points },
    { new: true, runValidators: true }
  );

  if (!activity) {
    return res.status(404).json({ message: 'Activity not found' });
  }
  res.json({ activity });
});

const getActivitySummary = asyncHandler(async (req, res) => {
  const cadetId = req.user.role === 'cadet' ? req.user._id : req.query.cadet || req.user._id;
  
  if (!cadetId) {
    return res.status(400).json({ message: 'cadet parameter required' });
  }

  const cadetObjectId = typeof cadetId === 'string' ? new mongoose.Types.ObjectId(cadetId) : cadetId;

  const summary = await Activity.aggregate([
    { $match: { cadet: cadetObjectId } },
    {
      $group: {
        _id: '$type',
        totalHours: { $sum: '$hours' },
        totalPoints: { $sum: '$points' },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({ summary });
});

module.exports = {
  createActivity,
  listActivities,
  updateActivityStatus,
  getActivitySummary,
};

