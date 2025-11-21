const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  target: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null },
  // optional owner/user fields could be added later
});

module.exports = mongoose.model('Link', LinkSchema);
