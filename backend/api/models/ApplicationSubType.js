const mangoose = require("mongoose");

const addSubApplicationTypeSchema = new mangoose.Schema(
    {
        application_id: { type: String, required: [true, "Application id is required"] },
        sub_application_code: { type: String, required: [true, "Code is required"] },
        sub_application_description: { type: String, required: [true, "Description is required"] },    
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
    }, { timestamps: true }
);

const AddSubApplicationType = mangoose.model("SubApplicationType", addSubApplicationTypeSchema);
module.exports = AddSubApplicationType;