const VisaType = require("../models/VisaType");
const mongoose = require("mongoose");

async function addVisaType(req, res) {
    try {
        const visaType = new VisaType({
            visa_type_name: req.body.visa_type_name,
            country: req.body.country,
            consultant_fee: req.body.consultant_fee,
            visa_fee: req.body.visa_fee,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
        });
        await visaType.save();
        return res.status(200).json({
            status: "success",
            data: {},
            message: "Visa type added successfully",
        }); 
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}

async function getVisaTypes(req, res) {
    try {
        const visaTypes = await VisaType.find();
        return res.status(200).json({
            status: "success",
            data: visaTypes,
            message: "Visa types fetched successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}

async function getVisatypeByConsultantId(req, res) {
    try {
        const consultant_id = req.params.consultant_id;
        const visaTypes = await VisaType.find({ created_by: consultant_id });

        if(visaTypes.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Visa types not found for the given consultant id",
            });
        }
        
        return res.status(200).json({
            status: "success",
            data: visaTypes,
            message: "Visa types fetched successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    addVisaType,
    getVisaTypes,
    getVisatypeByConsultantId
}