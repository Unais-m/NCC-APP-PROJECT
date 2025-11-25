const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: [
        'Weapon Training',
        'Map Reading',
        'First Aid',
        'Drill',
        'Physical Training',
        'Navy',
        'Air Force',
        'Other',
      ],
      default: 'Other',
    },
    branch: {
      type: String,
      enum: ['Army', 'Navy', 'Air Force', 'Common'],
      default: 'Common',
    },
    resourceType: {
      type: String,
      enum: ['pdf', 'video', 'link', 'image'],
      default: 'pdf',
    },
    url: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);

