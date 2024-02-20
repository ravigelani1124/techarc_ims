const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userConsultantSchema = new mongoose.Schema(
  {
    consultant_code: { type: String, required: true, unique: true },
    consultant_name_en: { type: String, required: true },
    consultant_name_fr: { type: String, required: false },
    consultant_license_number: { type: String, required: true, unique: true },
    consultant_phone: { type: String, required: true },
    consultant_email: { type: String, required: true, unique: true },
    org_name_en: { type: String, required: true },
    org_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    record_status: { type: Boolean, default: true },
    role: { type: String, default: "consultant" },
    consultant_password: { type: String, default: null },
    jwtToken: { type: String, default: null },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    consultant_email_token: { type: String, default: null },
    street_no: { type: String, required: true },
    street_name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

userConsultantSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.consultant_password = await bcrypt.hash(user.consultant_password, salt);
  }
  next();
});

const ConsultantUser = mongoose.model("UserConsultant", userConsultantSchema);

module.exports = ConsultantUser;
