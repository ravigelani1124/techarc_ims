const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        document_code: { type: String, required: [true, "Document code is required"] },
        document_name: { type: String, required: [true, "Document name is required"] },        
        record_status: { type: Boolean, default: true },       
        is_optional: { type: Boolean, default: false }, 
    },
    { timestamps: true }
);

const Documents = mongoose.model("Document", documentSchema);

module.exports = Documents;