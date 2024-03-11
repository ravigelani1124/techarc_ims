const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    org_code: {
      type: String,
      minlength: [3, "Organization code must be at least 3 characters long"],
      maxlength: [5, "Organization code cannot exceed 5 characters"],
      required: [true, "Organization code is required"],
      unique: true,
    },
    street_no: { type: String, required: [true, "Street no is required"] },
    street_name: { type: String, required: [true, "Address is required"] },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    zip: { type: String, required: [true, "Zip is required"] },
    country: { type: String, required: [true, "Country is required"] },
    org_name_en: {
      type: String,
      required: [true, "Organization name is required"],
    },
    org_name_fr: {
      type: String,
      required: [false, "Organization name is required"],
    },
    address_type: { type: String, required: [true, "Address type is required"] },
    org_email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email format",
      ],
      trim: true,
    },
    org_phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      minlength: [10, "Phone number must be 10 digits long"],
      maxlength: [10, "Phone number must be 10 digits long"],
    },
    phone_type: { type: String, default: "Mobile" },
    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    record_status: { type: Boolean, default: true },
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
    org_email_token: {
      type: String,
      default: null,
    },
    role: { type: String, default: "organization" },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
