const ConsultantUser = require('../models/ConsultantUser');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const generateVerificationToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

async function consultant_signup(req, res) {

    try{   
      const { name, email, consultancyName,cosultancyId, licenseNumber, contactNumber,superuserId } = req.body;
  
      if(!name){
        return res.status(400).json({
          status: "failed",
          data:{},
          message: "Name is required",
      });
      } 

      if(!consultancyName){
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
  
      if(!licenseNumber){
        return res.status(400).json({
          status: "failed",
          data:{},
          message: "License Number is required",
      });
      } 
      if(!contactNumber){
        return res.status(400).json({
            status: "failed",   
            data:{},
            message: "Contact Number is required and should be less than 10 numbers",
        })
      }

      if(!cosultancyId){
        return res.status(400).json({
            status: "failed",   
            data:{},
            message: "Consultancy Id is required",
        })
      }

      const existingUser = await ConsultantUser.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          status: "failed",
          data:{},
          message: "It seems you already have an account, please log in instead.",
      });
      }

      const emailVerificationToken = generateVerificationToken();

      const newUser = new ConsultantUser({
        name,
        consultancyName,
        email,
        licenseNumber,
        contactNumber,
        emailVerificationToken,
        superuserId, 
        cosultancyId
      });

      const savedUser = await newUser.save();

      await sendVerificationEmail(
        email,
        emailVerificationToken
      )

      res.status(200).json({
        status: "success",
        data: savedUser ,
        message: "Thank you for registering with us. Your account has been successfully created. Please verified your email address to create your account password.",
      })

    }catch(err){
        console.log(err);
    }
}

async function consultant_login(req, res) {
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
        const user = await ConsultantUser.findOne({ email });
        if(!user) {
          return res.status(400).json({
            status: "failed",
            data: {},
            message: "It seems you haven't have an account, please register instead.",
          });
        }
        if(user.isVerified===false){
          return res.status(400).json({
            status: "failed",
            data: {},
            message: "Please verify your email first",
          });
        }
        if(!user.password){
          return res.status(401).json({
            status: "failed",
            data: {},
            message: "Please set your password first",
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
          console.log("token---------",token);
         user.jwtToken = token;
         await user.save();

         return res.status(200).json({
           status: "success",
           data: user,
           message: "Login successful",
         })

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
      const user = await ConsultantUser.findOne({ emailVerificationToken: token });

      if(!user) {
        return res.status(400).json({
          status: "failed",
          data: {},
          message: "Invalid verification token",
        });
      }

      user.isVerified = true;
      await user.save();

      const email = user.email;
      console.log(email);
      res.render('create-password-consultant', { email });

  }catch(err){
    console.log(err);
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
  }
}



async function create_password_consultant(req, res) {
    
    const { email, password } = req.body;


    const user = await ConsultantUser.findOne({ email });
    if(!user) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "It seems you haven't have an account, please register instead.",
      });
    }

    if(user.password!==null){
      return res.status(401).json({
        status: "failed",
        data: {},
        message: "You have already set your password. Please login instead",
      });
    }

    user.password = password;

    await user.save();
    res.render('password-set-success.ejs');   
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
        text: `Thank you for registering with us. Please click on the following link to verify your email address: http://localhost:3000/api/auth/consultantverify/${token}`,
      };
    
      await transporter.sendMail(mailOptions);
    }

    async function delete_user_by_consultant(req, res) {
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
    
    module.exports = {
        consultant_signup,
        consultant_login,
      verify_email,
      create_password_consultant,
      delete_user_by_consultant
    }




