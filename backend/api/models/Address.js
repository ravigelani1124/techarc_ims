const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address_type: { type: String, required: [true, "Address type is required"] },
    street_no: { type: String, required: [true, "Street no is required"] },
    street_name: { type: String, required: [true, "Address is required"] },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    zip: { type: String, required: [true, "Zip is required"] },
    country: { type: String, required: [true, "Country is required"] },
    cleint_id: { type: mongoose.Schema.Types.ObjectId, required: true },    
    role: {type:String,require:true},
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

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
