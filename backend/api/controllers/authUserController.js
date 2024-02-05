const  User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');   


const generateVerificationToken = () => {
    return crypto.randomBytes(20).toString('hex');
};


const user_signup = async (req, res) => {
    try{
        const { name, email, consultancyName,cosultancyId,consultantId,consultantName } = req.body;

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

        if(!consultancyName){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "Name is required",
            });
        }

        if(!consultantId){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "Consultant id is required",
            });
        }
        if(!cosultancyId){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "Consultancy id is required",
            });
        }
        if(!consultantName){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "Consultant name is required",
            });
        }

        const existingUser = await User.findOne({ email }); 
    
        if(existingUser){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "User with this email already exists",
            });
        }
        const emailVerificationToken = generateVerificationToken();

        const newUser = new User({
            name,
            email,
            consultancyName,
            cosultancyId,
            consultantId,
            consultantName,
            emailVerificationToken
        });

        const savedUser = await newUser.save();
        await sendVerificationEmail(email, emailVerificationToken);

        return res.status(200).json({
            status: "success",
            data: { user: savedUser },
            message: "User created successfully",
        })

    }catch(err){
        console.error(err); 
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}


const user_login = async (req, res) => {

    const { email, password } = req.body;
    try{
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

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "User with this email does not exist",
            });
        }

        if(user.isVerified===false){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "Please verify your email first",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                status: "failed",
                data:{},
                message: "Invalid password",
            });
        }

        const token = jwt.generateToken(user);
        user.jwtToken = token;
        await user.save();

        return res.status(200).json({
            status: "success",
            data: user ,
            message: "User logged in successfully",
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
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
        text: `Thank you for registering with us. Please click on the following link to verify your email address: http://localhost:3000/api/auth/userVerify/${token}`,
      };
    
      await transporter.sendMail(mailOptions);
    }




async function verify_user_email(req, res) {
    const token = req.params.token;
  
    try {
        const user = await User.findOne({ emailVerificationToken: token });
  
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
        res.render('create-password-user', { email });
  
    }catch(err){
      console.log(err);
      return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
    }
  }
  


async function create_password_user(req, res) {
    
    const { email, password } = req.body;


    const user = await User.findOne({ email });
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

module.exports = {
    user_signup,
    user_login,
    verify_user_email,
    create_password_user
}