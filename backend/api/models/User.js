const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String,  unique: true },
    password: { type: String, default: null },
    role: { type: String,  default: "user" },
    jwtToken: { type: String ,default: null},
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    consultancyName: { type: String, required: true},
    consultantName: { type: String, required: true},
    consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ConsultantUser', required: true },
    cosultancyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultancy', required: true }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;