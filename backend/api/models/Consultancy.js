

  const mongoose = require('mongoose');

const consultantUserSchema = new mongoose.Schema({
  superuserId: { type: mongoose.Schema.Types.ObjectId, ref: 'SuperUser', required: true },
  consultancyName: { type: String, required: true},
  licenseNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});


const Consultancy = mongoose.model('Consultancy', consultantUserSchema);

module.exports = Consultancy;
