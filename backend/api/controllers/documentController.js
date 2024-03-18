const Document = require("../models/documents");
const SetConsultantServiceDoc = require("../models/SetConsultantServiceDoc");

async function addDocument(req, res) {
  try {
    const { document_name, document_code } = req.body;

    if (!document_name || !document_code) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }

    const documentExists = await Document.findOne({ document_name });
    if (documentExists) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Document already exists",
      });
    }
    const document = new Document({
      document_name,
      document_code,
    });

    await document.save();

    return res.status(200).json({
      status: "success",
      data: document,
      message: "Document added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    return res.status(200).json({
      status: "success",
      data: documents,
      message: "Documents fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const updatedDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { document_name } = req.body;

    console.log("API", id, document_name);
    if (!id) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Id is required",
      });
    }

    if (!document_name) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }

    const document = await Document.findByIdAndUpdate(
      id,
      {
        document_name,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: document,
      message: "Document updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

async function consultantSelectedServicesDocument(req, res) {
  try {
    const { sub_application_id, consultant_id, documents } = req.body;

    if (!sub_application_id || !consultant_id || !documents) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }

    let query = { sub_application_id, consultant_id };
    let update = { documents };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const setConsultantServiceDoc =
      await SetConsultantServiceDoc.findOneAndUpdate(query, update, options);
    return res.status(200).json({
      status: "success",
      data: setConsultantServiceDoc,
      message: "Document updated or added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}
async function getConsultantSelectedServicesDocument(req, res) {
  try {
    
    const { sub_application_id, consultant_id } = req.body;
    console.log(sub_application_id, consultant_id);
    
    if (!sub_application_id || !consultant_id) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }

    const setConsultantServiceDoc = await SetConsultantServiceDoc.findOne({
      sub_application_id,
      consultant_id,
    });


    return res.status(200).json({
      status: "success",
      data: setConsultantServiceDoc,
      message: "Document fetched successfully",
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
  addDocument,
  getDocuments,
  updatedDocument,
  consultantSelectedServicesDocument,
  getConsultantSelectedServicesDocument
};
