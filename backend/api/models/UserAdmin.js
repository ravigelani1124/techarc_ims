const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userAdminSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String,  unique: true },
  privateKey: { type: String, default: null },
  password: { type: String, required: true },
  isSuperUser: { type: Boolean, default: true },
  jwtToken: { type: String ,default: null},
  isVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  role: { type: String, default: 'admin' }
},{timestamps: true});

userAdminSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const UserAdmin = mongoose.model('UserAdmin', userAdminSchema);

module.exports = UserAdmin;
