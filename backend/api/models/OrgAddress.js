const mongoose = require('mongoose');

const orgAddressSchema = new mongoose.Schema({
    street_no: { type: String, required: [true, "Street no is required"] },
    street_name: { type: String, required: [true, "Address is required"] },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    zip: { type: String, required: [true, "Zip is required"] },
    country: { type: String, required: [true, "Country is required"] },
    org_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },    
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
      },      
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }
}, { timestamps: true });

const OrgAddress = mongoose.model("OrgAddress", orgAddressSchema);

module.exports = OrgAddress;
