const mongoose = require('mongoose');

const roles = ['cadet', 'ano', 'admin'];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'cadet',
    },
    rollNumber: String,
    unit: String,
    college: String,
    rank: String,
    contactNumber: String,
    batchYear: String,
    avatarUrl: String,
    certificates: [
      {
        label: String,
        url: String,
        awardedOn: Date,
      },
    ],
    cadetProfile: {
      bio: String,
      achievements: [String],
      skills: [String],
    },
    notifications: [
      {
        message: String,
        type: {
          type: String,
          default: 'info',
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);

