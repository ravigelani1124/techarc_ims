const mangoose = require("mongoose");

const applicationTypeSchema = new mangoose.Schema(
    {
        application_code: { type: String, required: [true, "Code is required"] },
        application_description: { type: String, required: [true, "Description is required"] },
        record_status: { type: Boolean, default: true },
        created_by: {
            type: mangoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
        },
        updated_by: {
            type: mangoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
        },
        sub_application_type: { type: [], default: [] },
    },
    { timestamps: true }
);

const ApplicationType = mangoose.model("ApplicationType", applicationTypeSchema);
module.exports = ApplicationType;