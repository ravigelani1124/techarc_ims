const ApplicationType = require("../models/ApplicationType");
const ApplicationSubType = require("../models/ApplicationSubType");
const ConsultantServices = require("../models/ConsultantServices");
async function addApplicationType(req, res) {
  try {
    const {
      application_code,
      application_description,
      created_by,
      updated_by,
    } = req.body;

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
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function getApplicationType(req, res) {
  try {
    const applicationType = await ApplicationType.find();
    return res.status(200).json({
      status: "success",
      data: applicationType,
      message: "Application type fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}
async function updateApplicationType(req, res) {
  try {
    const { id } = req.params;
    const { application_description } = req.body;

    console.log("API", id, application_description);
    if (!id) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Id is required",
      });
    }

    if (!application_description) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }

    const applicationType = await ApplicationType.findByIdAndUpdate(
      id,
      {
        application_description,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: applicationType,
      message: "Application type updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function addSubApplicationType(req, res) {
  try {
    const {
      application_id,
      sub_application_code,
      sub_application_description,
      created_by,
      updated_by,
      documents,
    } = req.body;

    if (
      !application_id ||
      !sub_application_code ||
      !sub_application_description ||
      !created_by ||
      !updated_by
    ) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }

    console.log(
      application_id,
      sub_application_code,
      sub_application_description,
      created_by,
      updated_by
    );
    const subApplicationTypeExists = await ApplicationSubType.findOne({
      sub_application_code,
    });
    if (subApplicationTypeExists) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Sub application type already exists",
      });
    }

    const subApplicationType = new ApplicationSubType({
      application_id,
      sub_application_code,
      sub_application_description,
      created_by,
      updated_by,
      documents
    });

    await subApplicationType.save();

    return res.status(200).json({
      status: "success",
      data: subApplicationType,
      message: "Sub application type added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
}

async function getAllApplicationWithSubType(req, res) {
  try {
    const applicationType = await ApplicationType.find();
    const applicationTypeWithSubType = await Promise.all(
      applicationType.map(async (application) => {
        console.log(application._id);
        const subApplicationType = await ApplicationSubType.find({
          application_id: application._id,
        });
        console.log(subApplicationType);
        application.sub_application_type = subApplicationType;
        return application;
      })
    );

    console.log(applicationTypeWithSubType);

    return res.status(200).json({
      status: "success",
      data: applicationTypeWithSubType,
      message: "Applications fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function updateSubApplicationType(req, res) {
  try {
    const { id } = req.params;
    const { sub_application_description } = req.body;

    console.log("API", id, sub_application_description);
    if (!id || !sub_application_description) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Id and sub application description are required",
      });
    }
    const subApplicationType = await ApplicationSubType.findByIdAndUpdate(
      id,
      {
        sub_application_description,
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      data: subApplicationType,
      message: "Sub application type updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function addConsultantSelectedServices(req, res) {
  try {
    const { consultant_id, services } = req.body;

    if (!consultant_id) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Id is required",
      });
    }

    const updatedService = await ConsultantServices.findOneAndUpdate(
      { consultant_id: consultant_id },
      { services },
      { new: true, upsert: true }
    );

    const message = updatedService
      ? "Consultant selected services updated successfully"
      : "Consultant selected services added successfully";

    return res.status(200).json({
      status: "success",
      data: updatedService,
      message: message,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}
async function getConsultantSelectedServices(req, res) {
  try {
    const { id } = req.params;
    const consultantSelectedServices = await ConsultantServices.findOne({
      consultant_id: id,
    });

    if (!consultantSelectedServices) {
      return res.status(404).json({
        status: "failed",
        data: {},
        message: "Consultant selected services not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: consultantSelectedServices.services,
      message: "Consultant selected services fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function getConsultantApplicationTypeData(req, res) {
  try {
    const { id } = req.params;

    // Find consultant services by consultant_id
    const consultantServices = await ConsultantServices.findOne({ consultant_id: id });

    if (!consultantServices) {
      return res.status(404).json({
        status: "failed",
        data: {},
        message: "Consultant services not found",
      });
    }

    // Extract service array from consultant services
    const serviceIds = consultantServices.services;

    // Find application subtypes for the service IDs
    const applicationSubTypes = await ApplicationSubType.find({ _id: { $in: serviceIds } });

    // Extract application IDs from the found application subtypes
    const applicationIds = applicationSubTypes.map(subType => subType.application_id);

    // Find application types corresponding to the application IDs
    const applicationTypes = await ApplicationType.find({ _id: { $in: applicationIds } });

    applicationTypes.forEach(applicationType => {
      applicationType.sub_application_type = applicationSubTypes.filter(subType => subType.application_id.toString() === applicationType._id.toString());
    })

    return res.status(200).json({
      status: "success",
      data: applicationTypes,
      message: "Application types fetched successfully",
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
  addApplicationType,
  getApplicationType,
  updateApplicationType,
  addSubApplicationType,
  getAllApplicationWithSubType,
  updateSubApplicationType,
  addConsultantSelectedServices,
  getConsultantSelectedServices,
  getConsultantApplicationTypeData,
};
