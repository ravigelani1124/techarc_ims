
const mangoose = require("mongoose");

const setConsultantServiceDocSchema = new mangoose.Schema(
    {
        sub_application_id: { type: String, required: true },
        consultant_id: { type: String, required: true },
        documents: { type: [{ type: String }], default: [] },
    }
);

const SetConsultantServiceDoc = mangoose.model("SetConsultantServiceDoc", setConsultantServiceDocSchema);
module.exports = SetConsultantServiceDoc;