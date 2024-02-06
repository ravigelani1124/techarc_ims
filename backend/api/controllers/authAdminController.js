const SuperUser = require('../models/SuperUser');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const ConsultantUser = require('../models/ConsultantUser');

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

    const existingUser = await SuperUser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data:{},
        message: "It seems you already have an account, please log in instead.",
    });
    }

    const emailVerificationToken = generateVerificationToken();

    const newUser = new SuperUser({
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
      const user = await SuperUser.findOne({ email });
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
    const user = await SuperUser.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Invalid verification token",
      });
    }

    // Update the user's isVerified status
    user.isVerified = true;

    // Save the updated user back to the database
    await user.save();

    return res.status(200).json({
      status: "success",
      data: { user },
      message: "Email verification successful",
    });

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
  
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ravi.gelanee@gmail.com',
    pass: 'tvgp vcpt aimw njdf',
  },
});

  const mailOptions = {
    from: 'techarc@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Thank you for registering with us. Please click on the following link to verify your email address: http://localhost:3000/api/auth/superverify/${token}`,
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
    await ConsultantUser.findByIdAndDelete(id);
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



