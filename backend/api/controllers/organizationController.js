const Organization = require("../models/Organization");
const Address = require("../models/Address");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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
  try {
    const {
      org_code,
      org_name_en,
      org_name_fr,
      org_email,
      org_phone,
      created_by,
      updated_by,
      street_no,
      street_name,
      city,
      state,
      zip,
      country,
    } = req.body;

    const org_email_token = generateVerificationToken();

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
      updated_by,
      org_email_token,
    });

    const savedOrganization = await organization.save();

    await new Address({
      cleint_id: savedOrganization._id, // Associate address with organization
      street_no,
      street_name,
      city,
      state,
      zip,
      country,
      created_by,
      updated_by,
      role:"organization"
    }).save();

    await sendVerificationEmail(org_email, org_email_token);

    return res.status(200).json({
      status: "success",
      data: savedOrganization,
      message: "Organization created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      err,
    });
  }
}

async function sendVerificationEmail(email, token) {

  const mailOptions = {
    from: "techarc@gmail.com",
    to: email,
    subject: "Organization Email Verification",
    html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f2f2f2;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    border-radius: 5px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header h2 {
                    color: #007bff;
                    margin-top: 0;
                }
                .content {
                    padding: 20px;
                    border-top: 1px solid #ccc;
                    border-bottom: 1px solid #ccc;
                }
                .content p {
                    margin: 0 0 10px;
                    line-height: 1.5;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Email Verification</h2>
                    </div>
                    <div class="content">
                        <p>Dear Organization,</p>
                        <p>Thank you for registering with us. To complete your registration, please click on the following link to verify your email address:</p>
                        <p><a class="button" href="http://localhost:3000/api/organization/orgverify/${token}">Verify Email Address</a></p>
                        <p>If the above button doesn't work, you can copy and paste the following URL into your browser:</p>
                        <p>http://localhost:3000/api/organization/orgverify/${token}</p>
                        <p>If you did not sign up for our service, you can ignore this email.</p>
                        <p>Best Regards,<br/>TechArc</p>
                    </div>
                </div>
            </body>
            </html>
        `,
  };

  await transporter.sendMail(mailOptions);
}

async function verify_organization_email(req, res) {
  const token = req.params.token;

  try {
    const organization = await Organization.findOne({ org_email_token: token });

    if (!organization) {
      return res.render("404", { errorMessage: "Organization not found" });
    }

    if (token !== organization.org_email_token) {
      return res.render("404", { errorMessage: "invalid token" });
    }

    organization.is_email_verified = true;
    await organization.save();

    const title = "Verification Successful";
    const message = "Your organization email has been successfully verified.";

    res.render("email-verification-success", { title, message });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

module.exports = {
  getOrganizations,
  addOrganization,
  verify_organization_email,
};
