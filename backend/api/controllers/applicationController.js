const ApplicationType = require("../models/ApplicationType");

async function addApplicationType(req, res) {

    try{
        const { application_code, application_description, created_by, updated_by } =
        req.body;
    
      if (
        !application_code ||
        !application_description ||
        !created_by ||
        !updated_by
      ) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "All fields are required",
        });
      }

      const applicationTypeExists = await ApplicationType.findOne({
        application_code,
      });
      if (applicationTypeExists) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "Application type already exists",
        });
      }
    
      const applicationType = new ApplicationType({
        application_code,
        application_description,
        created_by,
        updated_by,
      });

      await applicationType.save();

      return res.status(200).json({
        status: "success",
        data: {},
        message: "Application type added successfully",
      });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }  
}


module.exports = {
    addApplicationType
}
