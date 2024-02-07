const Consultancy = require('../models/Consultancy');

async function addConsultancy(req, res) {
    try {
        const { superuserId, consultancyName, licenseNumber } = req.body;
        if(!consultancyName){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "Name is required",
            });
        }
        if( !licenseNumber) {
            return res.status(400).json({
                status: "failed",
                data: {},
                message: "License number is required",
            });
        }
        if(!superuserId){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "Superuser id is required",
            });
        }
        
        const consultancy = await new Consultancy(req.body).save();
        return res.status(200).json({
            status: "success",
            data: { consultancy },
            message: "Consultancy added successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
}


async function getConsultancyList(req,res){

    try {
        const consultancy = await Consultancy.find();
        return res.status(200).json({
            status: "success",
            data: consultancy,
            message: "Consultancy fetched successfully",
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
    addConsultancy,
    getConsultancyList
}
