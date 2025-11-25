const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

const createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json({ notification });
});

const listNotifications = asyncHandler(async (req, res) => {
  const query = {};
  if (req.user.role === 'cadet') {
    query.$or = [
      { targetRoles: { $size: 0 } },
      { targetRoles: { $exists: false } },
      { targetRoles: req.user.role },
    ];
  }

  const notifications = await Notification.find(query).sort({ createdAt: -1 });
  res.json({ notifications });
});

const markRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findById(id);
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  notification.recipients = notification.recipients || [];
  const recipient = notification.recipients.find((r) => String(r.cadet) === String(req.user._id));
  if (recipient) {
    recipient.isRead = true;
    recipient.readAt = new Date();
  } else {
    notification.recipients.push({
      cadet: req.user._id,
      isRead: true,
      readAt: new Date(),
    });
  }

  await notification.save();
  res.json({ notification });
});

module.exports = { createNotification, listNotifications, markRead };

