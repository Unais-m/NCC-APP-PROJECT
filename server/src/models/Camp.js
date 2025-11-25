const mongoose = require('mongoose');

const campSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    campType: {
      type: String,
      enum: ['CATC', 'RDC', 'TSC', 'Trekking', 'Other'],
      default: 'Other',
    },
    location: String,
    startDate: Date,
    endDate: Date,
    description: String,
    capacity: Number,
    applicants: [
      {
        cadet: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
        appliedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Camp', campSchema);

