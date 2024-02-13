const UserAdmin = require('../models/UserAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UserConsultant = require('../models/UserConsultant');



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

async function super_signup(req, res) {
  try{   
    const { name, email, password, privateKey } = req.body;

    if(!name){
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "Name is required",
    });
    } 

    if(!email){
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "Email is required",
    });
    }

    if(!password){
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "Password is required",
    });
    }

    if(privateKey!=="123456"){
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "Please enter a valid private key",
    });
    }

    const existingUser = await UserAdmin.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "It seems you already have an account, please log in instead.",
    });
    }

    const emailVerificationToken = generateVerificationToken();

    const newUser = new UserAdmin({
      name,
      email,
      password,
      emailVerificationToken
    }); 

    const savedUser = await newUser.save(); 

     // Send a verification email to the user
     await sendVerificationEmail(email, emailVerificationToken);
    

    res.status(200).json({
      status: "success",
      data: savedUser,
      message: "Thank you for registering with us. Your account has been successfully created. Please verified your email address to login.",
  });  

  }catch(err){
    console.error(err);
    return res.status(400).json({
      status: "failed",
      data:{},
      message: err.message,
  });
  }
}

async function super_login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "Email is required",
    });
    }

    if (!password) {
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "Password is required",
    });
    }

    try {
      // Check if user exists
      const user = await UserAdmin.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "It seems you haven't have an account, please register instead.",
        });
      }

      if(user.isVerified === false){
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "Please verify your email address",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "Invalid credentials",
        });
      }

      const token = jwt.generateToken(user);
      // Save the token to the user document in the database
      console.log("token---------",token);
      user.jwtToken = token;
      await user.save();

      // Send the token in the response or handle it accordingly
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
    // Find the user by the verification token
    const user = await UserAdmin.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.render("404", { errorMessage: "User not found" });
    }

    if(token !== user.emailVerificationToken) {
      return res.render("404", { errorMessage: "invalid token" });
    }
    // Update the user's isVerified status
    user.isVerified = true;

    // Save the updated user back to the database
    await user.save();

    const title = "Verification Successful";
    const message = "Your email has been successfully verified.";

    res.render("email-verification-success", { title, message });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

// Function to send a verification email
async function sendVerificationEmail(email, token) {

  const mailOptions = {
    from: "techarc@gmail.com",
    to: email,
    subject: "Admin Email Verification",
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
                        <p>Dear Admin,</p>
                        <p>Thank you for registering with us. To complete your registration, please click on the following link to verify your email address:</p>
                        <p><a class="button" href="http://localhost:3000/api/auth/adminverify/${token}">Verify Email Address</a></p>
                        <p>If the above button doesn't work, you can copy and paste the following URL into your browser:</p>
                        <p>http://localhost:3000/api/auth/adminverify/${token}</p>
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


async function delete_consultant_by_admin(req, res) {
  try {
    const id = req.body.id;
    if(!id){
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "Id is required",
    });
    }
    await UserConsultant.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      data: {},
      message: "Consultant deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

async function changePassword(req, res) {
  const { email, password } = req.body;
  
}

module.exports = {
  super_signup,
  super_login,
  verify_email,
  delete_consultant_by_admin
};



