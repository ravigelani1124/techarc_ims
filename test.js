const Organization = require("../models/Organization");
const Address = require("../models/Address");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

// Send verification email
async function sendVerificationEmail(email, token) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
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
          /* Styles */
          </style>
      </head>
      <body>
          <!-- Email content -->
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Get organizations
async function getOrganizations(req, res) {
  try {
    const organizations = await Organization.find();
    return res.status(200).json({
      status: "success",
      data: organizations,
      message: "Organizations fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

// Add organization
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

    // Generate verification token
    const org_email_token = generateVerificationToken();

    // Create organization object
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

    // Save organization
    const savedOrganization = await organization.save();

    // Create address associated with organization
    await new Address({
      org_id: savedOrganization._id,
      street_no,
      street_name,
      city,
      state,
      zip,
      country,
      created_by,
      updated_by,
      role: "organization",
    }).save();

    // Send verification email
    await sendVerificationEmail(org_email, org_email_token);

    return res.status(200).json({
      status: "success",
      data: savedOrganization,
      message: "Organization created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

// Verify organization email
async function verifyOrganizationEmail(req, res) {
  const token = req.params.token;

  try {
    // Find organization by token
    const organization = await Organization.findOne({ org_email_token: token });

    if (!organization) {
      return res.render("404", { errorMessage: "Organization not found" });
    }

    if (token !== organization.org_email_token) {
      return res.render("404", { errorMessage: "Invalid token" });
    }

    // Update organization email verification status
    organization.is_email_verified = true;
    await organization.save();

    // Render success page
    const title = "Verification Successful";
    const message = "Your organization email has been successfully verified.";
    res.render("email-verification-success", { title, message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getOrganizations,
  addOrganization,
  verifyOrganizationEmail,
};
