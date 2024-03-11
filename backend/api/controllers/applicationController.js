const ApplicationType = require("../models/ApplicationType");

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

module.exports = {
  addApplicationType,
  getApplicationType,
  updateApplicationType,
};
