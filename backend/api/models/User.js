const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  user_name_en: { type: String, required: true},
    user_email: { type: String,  required: true },
    user_code: { type: String, required: true, unique: true },
    user_password: { type: String, default: null },
    role: { type: String,  default: "user" },
    jwtToken: { type: String ,default: null},
    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    user_email_token: { type: String,default: null },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consultant",
      required: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consultant",
      required: true,
    },
    consultant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consultant",
      required: true,
    },
    consultant_name_en: { type: String, required: true},
    street_no: { type: String, required: true },
    street_name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
},{ timestamps: true });

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