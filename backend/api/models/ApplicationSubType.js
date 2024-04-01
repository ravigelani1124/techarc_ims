// AddSubApplicationType.js
const mongoose = require("mongoose");

const addSubApplicationTypeSchema = new mongoose.Schema(
    {
        application_id: { type: String, required: [true, "Application id is required"] },
        sub_application_code: { type: String, required: [true, "Code is required"] },
        sub_application_description: { type: String, required: [true, "Description is required"] },    
        documents: { type: [{
            document_code: { type: String, required: [true, "Document code is required"] },
            document_name: { type: String, required: [true, "Document name is required"] },        
            record_status: { type: Boolean, default: true },       
            is_optional: { type: Boolean, default: false }, 
        }], default: [] },
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
    }, { timestamps: true }
);

const AddSubApplicationType = mongoose.model("SubApplicationType", addSubApplicationTypeSchema);
module.exports = AddSubApplicationType;
