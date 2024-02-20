const UserConsultant = require("../models/UserConsultant");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Address = require("../models/Address");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

async function consultant_signup(req, res) {
  try {
    const {
      consultant_code,
      consultant_name_en,
      consultant_license_number,
      consultant_phone,
      consultant_email,
      org_name_en,
      org_id,
      street_no,
      street_name,
      city,
      state,
      zip,
      country,
      created_by,
      updated_by,
    } = req.body;

    if (
      !consultant_code ||
      !consultant_name_en ||
      !consultant_license_number ||
      !consultant_phone ||
      !consultant_email ||
      !org_name_en ||
      !org_id ||
      !street_no ||
      !street_name ||
      !city ||
      !state ||
      !zip ||
      !country
    ) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }
    const existingUser = await UserConsultant.findOne({ consultant_email });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "It seems you already have an account, please log in instead.",
      });
    }

    const consultant_email_token = generateVerificationToken();

    const newUser = new UserConsultant({
      consultant_code,
      consultant_name_en,
      consultant_license_number,
      consultant_phone,
      consultant_email,
      org_name_en,
      org_id,
      street_no,
      street_name,
      city,
      state,
      zip,
      country,
      consultant_email_token,
      created_by,
      updated_by,
    });
    const savedUser = await newUser.save();

    await new Address({
      cleint_id: newUser._id, // Associate address with organization
      street_no,
      street_name,
      city,
      state,
      zip,
      country,
      created_by,
      updated_by,
      role: "consultant",
    }).save();

    await sendVerificationEmail(consultant_email, consultant_email_token);

    res.status(200).json({
      status: "success",
      data: savedUser,
      message:
        "Thank you for registering with us. Your account has been successfully created. Please verified your email address to create your account password.",
    });
  } catch (err) {
    console.log(err);
  }
}

async function consultant_login(req, res) {
  const { consultant_email, consultant_password } = req.body;

  try {
    if (!consultant_email) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Email is required",
      });
    }

    if (!consultant_password) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Password is required",
      });
    }

    try {
      const user = await UserConsultant.findOne({ consultant_email });
      if (!user) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message:
            "It seems you haven't have an account, please register instead.",
        });
      }
      if (user.is_email_verified === false) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "Please verify your email first",
        });
      }
      if (!user.consultant_password) {
        return res.status(401).json({
          status: "failed",
          data: {},
          message: "Please set your password first",
        });
      }
      const isPasswordValid = await bcrypt.compare(consultant_password, user.consultant_password);

      // if (!isPasswordValid) {
      //   return res.status(400).json({
      //     status: "failed",
      //     data: {},
      //     message: "Invalid credentials",
      //   });
      // }

      if(user.record_status === false) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "Your account has been deactivated. Please contact admin",
        });
      }
      const token = jwt.generateToken(user);
      console.log("token---------", token);
      user.jwtToken = token;
      await user.save();

      return res.status(200).json({
        status: "success",
        data: user,
        message: "Login successful",
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}
async function verify_email(req, res) {
  const token = req.params.token;

  try {
    const user = await UserConsultant.findOne({
      consultant_email_token: token,
    });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Invalid verification token",
      });
    }

    user.is_email_verified = true;
    await user.save();
    const email = user.consultant_email;
    console.log(email);
    res.render("create-password-consultant", { email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function create_password_consultant(req, res) {
  const { email, password } = req.body;

  const consultant_email = email;
  const consultant_password = password;
  const user = await UserConsultant.findOne({ consultant_email });
  if (!user) {
    return res.render("404", { errorMessage: "It seems you haven't have an account, please register instead." });    
  }

  if (user.consultant_password !== null) {
    return res.render("404", { errorMessage: "You have already set your password. Please login instead" });
  }

  const hashedPassword = await bcrypt.hash(consultant_password, 10);
  user.consultant_password = hashedPassword;

  await user.save();
  res.render("password-set-success.ejs");
}

// Function to send a verification email
async function sendVerificationEmail(email, token) {
  const mailOptions = {
    from: "techarc@gmail.com",
    to: email,
    subject: "Consultant Email Verification",
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
                            <p>Dear Consultant,</p>
                            <p>Thank you for registering with us. To complete your registration, please click on the following link to verify your email address and create your password:</p>
                            <p><a class="button" href="http://localhost:3000/api/auth/consultantverify/${token}">Verify Email Address</a></p>
                            <p>If the above button doesn't work, you can copy and paste the following URL into your browser:</p>
                            <p>http://localhost:3000/api/auth/consultantverify/${token}</p>
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

async function delete_user_by_consultant(req, res) {
  try {
    const id = req.body.id;
    if (!id) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Id is required",
      });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      data: {},
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function getConsultantList(req, res) {
  try {
    const consultants = await UserConsultant.find();
    return res.status(200).json({
      status: "success",
      data: consultants,
      message: "Consultant fetched successfully",
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
  consultant_signup,
  consultant_login,
  verify_email,
  create_password_consultant,
  delete_user_by_consultant,
  getConsultantList,
};
