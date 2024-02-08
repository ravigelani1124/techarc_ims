const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const consultantUserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    superuserId: { type: mongoose.Schema.Types.ObjectId, ref: 'SuperUser', required: true },
    consultancyName: { type: String, required: true},
    email: { type: String,  unique: true },
    licenseNumber: { type: String, required: true, unique: true },
    contactNumber: { type: Number, required: true},
    role: { type: String,  default: "consultant" },
    password: { type: String, default: null },
    jwtToken: { type: String ,default: null},
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    cosultancyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultancy', required: true }
  });
  
  consultantUserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  });
  
  const ConsultantUser = mongoose.model('ConsultantUser', consultantUserSchema);
  
  module.exports = ConsultantUser;
