const Attendance = require('../models/Attendance');
const asyncHandler = require('../utils/asyncHandler');

const markAttendance = asyncHandler(async (req, res) => {
  const { campId, date, records } = req.body;

  const attendance = await Attendance.findOneAndUpdate(
    { camp: campId, date },
    { records, markedBy: req.user._id, camp: campId, date },
    { upsert: true, new: true }
  );

  res.json({ attendance });
});

const getAttendance = asyncHandler(async (req, res) => {
  const { campId } = req.params;
  const attendance = await Attendance.find({ camp: campId }).populate('records.cadet', 'name rollNumber');
  res.json({ attendance });
});

module.exports = { markAttendance, getAttendance };

