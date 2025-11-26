const User = require('../models/User');
const Activity = require('../models/Activity');
const Camp = require('../models/Camp');
const asyncHandler = require('../utils/asyncHandler');

const listCadets = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { rollNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const cadets = await User.find(filter).select('name email role college rollNumber unit');
  res.json({ cadets });
});

const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ message: 'role is required' });
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user });
});

const adminStats = asyncHandler(async (_req, res) => {
  const [cadetCount, activityCount, campCount] = await Promise.all([
    User.countDocuments(),
    Activity.countDocuments(),
    Camp.countDocuments(),
  ]);

  res.json({
    stats: {
      cadets: cadetCount,
      activities: activityCount,
      camps: campCount,
    },
  });
});

module.exports = {
  listCadets,
  updateRole,
  adminStats,
};



