const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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

const user_signup = async (req, res) => {
  try {
    const {
      user_name_en,
      user_email,      
      user_phone,
      user_code,
      consultant_id,
      consultant_name_en,
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
      !user_email ||
      !user_name_en ||
      !user_phone ||      
      !user_code ||
      !consultant_id ||
      !consultant_name_en ||
      !street_no ||
      !street_name ||
      !city ||
      !state ||
      !zip ||
      !country ||
      !created_by ||
      !updated_by
    ) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ user_email });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "User with this email already exists",
      });
    }

    const user_email_token = generateVerificationToken();

    const newUser = new User({
      user_name_en,
      user_email, 
      user_phone,
      user_code,
      consultant_id,
      consultant_name_en,
      street_no,
      street_name,
      city,
      state,
      zip,
      country,
      created_by,
      updated_by,
      user_email_token,
    });

    const savedUser = await newUser.save();

    await new Address({
      client_id: savedUser._id,
      street_no,
      street_name,
      city,
      state,
      zip,
      country,
      created_by,
      updated_by,
      role: "user",
    });

    await sendVerificationEmail(
      user_email,
      user_email_token
    )

      return res.status(200).json({
        status: "success",
        data: savedUser,
        message: "User created successfully",
    })
    // const { name, email, consultancyName,cosultancyId,consultantId,consultantName } = req.body;

    // if(!name){
    //     return res.status(400).json({
    //         status: "failed",
    //         data:{},
    //         message: "Name is required",
    //     });
    // }

    // if(!email){
    //     return res.status(400).json({
    //         status: "failed",
    //         data:{},
    //         message: "Email is required",
    //     });
    // }

    // if(!consultancyName){
    //     return res.status(400).json({
    //         status: "failed",
    //         data:{},
    //         message: "Name is required",
    //     });
    // }

    // if(!consultantId){
    //     return res.status(400).json({
    //         status: "failed",
    //         data:{},
    //         message: "Consultant id is required",
    //     });
    // }
    // if(!cosultancyId){
    //     return res.status(400).json({
    //         status: "failed",
    //         data:{},
    //         message: "Consultancy id is required",
    //     });
    // }
    // if(!consultantName){
    //     return res.status(400).json({
    //         status: "failed",
    //         data:{},
    //         message: "Consultant name is required",
    //     });
    // }

    // const existingUser = await User.findOne({ email });

    // if(existingUser){
    //     return res.status(400).json({
    //         status: "failed",
    //         data:{},
    //         message: "User with this email already exists",
    //     });
    // }
    // const emailVerificationToken = generateVerificationToken();

    // const newUser = new User({
    //     name,
    //     email,
    //     consultancyName,
    //     cosultancyId,
    //     consultantId,
    //     consultantName,
    //     emailVerificationToken
    // });

    // const savedUser = await newUser.save();
    // await sendVerificationEmail(email, emailVerificationToken);

    // return res.status(200).json({
    //     status: "success",
    //     data: { user: savedUser },
    //     message: "User created successfully",
    // })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const user_login = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    if (!user_email) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Email is required",
      });
    }

    if (!user_password) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Password is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "User with this email does not exist",
      });
    }

    if (user.is_email_verified === false) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Please verify your email first",
      });
    }

    if(user.record_status === false) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "Your account has been deactivated. Please contact Consultant",
        });
      }

    const isPasswordValid = await bcrypt.compare(user_password, user.user_password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Invalid password",
      });
    }

    const token = jwt.generateToken(user);
    user.jwtToken = token;
    await user.save();

    return res.status(200).json({
      status: "success",
      data: user,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Function to send a verification email
async function sendVerificationEmail(email, token) {

const mailOptions = {
    from: "techarc@gmail.com",
    to: email,
    subject: "User Email Verification",
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
                            <p>Dear User,</p>
                            <p>Thank you for registering with us. To complete your registration, please click on the following link to verify your email address and create your password:</p>
                            <p><a class="button" href="http://localhost:3000/api/auth/userVerify/${token}">Verify Email Address</a></p>
                            <p>If the above button doesn't work, you can copy and paste the following URL into your browser:</p>
                            <p>http://localhost:3000/api/auth/userVerify/${token}</p>
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

async function verify_user_email(req, res) {
  const token = req.params.token;

  try {
    const user = await User.findOne({ user_email_token: token });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Invalid verification token",
      });
    }

    user.is_email_verified = true;
    await user.save();

    const email = user.user_email;
    console.log(email);
    res.render("create-password-user", { email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function create_password_user(req, res) {
  const { email, password } = req.body;

  const user_email = email;
  const user_password = password;

  const user = await User.findOne({ user_email });
  if (!user) {
    return res.render("404", { errorMessage: "It seems you haven't have an account, please register instead." });    
  }

  if (user.user_password !== null) {
    return res.render("404", { errorMessage: "You have already set your password. Please login instead" });
  }
  const hashedPassword = await bcrypt.hash(user_password, 10);
  user.user_password = hashedPassword;

  await user.save();
  res.render("password-set-success.ejs");
}

module.exports = {
  user_signup,
  user_login,
  verify_user_email,
  create_password_user,
};
