const Services = require("../models/Services");


async function addVisaType(req, res) {
    try {
        const service = new Services({
            service_type_name: req.body.service_type_name,
            country: req.body.country,
            consultant_fee: req.body.consultant_fee,
            service_fee: req.body.service_fee,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
        });
        await service.save();
        return res.status(200).json({
            status: "success",
            data: {},
            message: "Service added successfully",
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
        const visaTypes = await Services.find();
        return res.status(200).json({
            status: "success",
            data: visaTypes,
            message: "Service fetched successfully",
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
        const visaTypes = await Services.find({ created_by: consultant_id });

        if(visaTypes.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Service not found for the given consultant id",
            });
        }
        
        return res.status(200).json({
            status: "success",
            data: visaTypes,
            message: "Service fetched successfully",
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