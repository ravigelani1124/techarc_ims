const mangoose = require("mongoose");

const serviceSchema = new mangoose.Schema(
  {
    service_type_name: { type: String, required: [true, "Visa type is required"] },
    record_status: { type: Boolean, default: true },
    country: { type: String, required: [true, "Country is required"] },
    service_fee: { type: Number, required: [true, "Visa fee is required"] },
    consultant_fee: {
      type: Number,
      required: [true, "Consultant fee is required"],
    },
  
    created_by: {
      type: mangoose.Schema.Types.ObjectId,
      ref: "consultant",
      required: true,
    },
    updated_by: {
      type: mangoose.Schema.Types.ObjectId,
      ref: "consultant",
      required: true,
    },
  },
  { timestamps: true }
);

const Services = mangoose.model("Service", serviceSchema);

module.exports = Services;
