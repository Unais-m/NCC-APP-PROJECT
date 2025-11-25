const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['info', 'alert', 'camp', 'training'],
      default: 'info',
    },
    targetRoles: [
      {
        type: String,
        enum: ['cadet', 'ano', 'admin'],
      },
    ],
    recipients: [
      {
        cadet: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        readAt: Date,
      },
    ],
    attachments: [
      {
        label: String,
        url: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);

