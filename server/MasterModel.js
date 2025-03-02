// models/MasterModel.js
const mongoose = require('mongoose');
const generateUniqueId = require('../utils/generateUniqueId');

const MasterSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['tag', 'serviceCategory', 'blogCategory'],
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    uniqueId: { type: String, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MasterSchema.index({ type: 1, name: 1 }, { unique: true });

MasterSchema.pre('save', function (next) {
  if (!this.uniqueId) {
    this.uniqueId = generateUniqueId(this.type);
  }
  next();
});

module.exports = mongoose.models.Master || mongoose.model('Master', MasterSchema);
