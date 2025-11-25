const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    cadet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['parade', 'drill', 'camp', 'social', 'training', 'other'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    hours: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    metadata: {
      campType: String,
      location: String,
      certificateUrl: String,
      proofUrl: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);

