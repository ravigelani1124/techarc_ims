const Organization = require('../models/Organization');
const OrgAddress = require('../models/OrgAddress');
async function getOrganizations(req, res) {

    try {
        const organization = await Organization.find();
        return res.status(200).json({
            status: "success",
            data: organization,
            message: "Organization fetched successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
}

async function addOrganization(req, res) {
    try{    
        const {org_code, org_name_en, org_name_fr, org_email, org_phone, created_by, updated_by, street_no, street_name, city, state, zip, country} = req.body
        const organization = new Organization({
            org_code,
            org_name_en,
            org_name_fr,
            org_email,
            org_phone,
            street_no,
            street_name,    
            city,   
            state,  
            zip,   
            country, 
            created_by,
            updated_by
        });
    
        const savedOrganization = await organization.save();

        await new OrgAddress({
            org_id: savedOrganization._id, // Associate address with organization
            street_no,
            street_name,
            city,
            state,
            zip,
            country,
            created_by,
            updated_by
        }).save();

        return res.status(200).json({
            status: "success",
            data: savedOrganization,
            message: "Organization created successfully",
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error", err
        });
    }
}

module.exports = {
    getOrganizations,
    addOrganization
}

// async function addConsultancy(req, res) {
//     try {
//         const { superuserId, consultancyName, licenseNumber } = req.body;
//         if(!consultancyName){
//             return res.status(400).json({
//                 status: "failed",
//                 data:{},
//                 message: "Name is required",
//             });
//         }
//         if( !licenseNumber) {
//             return res.status(400).json({
//                 status: "failed",
//                 data: {},
//                 message: "License number is required",
//             });
//         }
//         if(!superuserId){
//             return res.status(400).json({
//                 status: "failed",
//                 data:{},
//                 message: "Superuser id is required",
//             });
//         }
        
//         const consultancy = await new Consultancy(req.body).save();
//         return res.status(200).json({
//             status: "success",
//             data: { consultancy },
//             message: "Consultancy added successfully",
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             status: "error",
//             message: err.message,
//         });
//     }
// }


// async function getConsultancyList(req,res){

//     try {
//         const consultancy = await Consultancy.find();
//         return res.status(200).json({
//             status: "success",
//             data: consultancy,
//             message: "Consultancy fetched successfully",
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             status: "error",
//             message: "Internal Server Error",
//         });
//     }

// }

// module.exports = {
//     addConsultancy,
//     getConsultancyList
// }
