const Document = require("../models/documents");

async function addDocument(req, res) {

    try{
        const { document_name, document_code} = req.body;

      if (
        !document_name ||
        !document_code
      ) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "All fields are required",
        });
      }

      const documentExists = await Document.findOne({document_name})
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
}

module.exports = {
    addDocument ,
    getDocuments
}