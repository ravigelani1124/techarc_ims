const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Address = require("../models/Address");
const { sendVerificationEmailUser, generateVerificationToken } = require("../utils/email");

/**
 * Handles the signup process for a user.
 */
const userSignup = async (req, res) => {
  try {
    const userData = req.body;

    // Check if all required fields are provided
    const requiredFields = [
      "user_name_en",
      "user_email",
      "user_phone",
      "user_code",
      "consultant_id",
      "consultant_name_en",
      "street_no",
      "street_name",
      "city",
      "state",
      "zip",
      "country",
      "created_by",
      "updated_by",
    ];
    if (requiredFields.some(field => !userData[field])) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "All fields are required",
      });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ user_email: userData.user_email });
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "User with this email already exists",
      });
    }

    // Generate a verification token
    const user_email_token = generateVerificationToken();

    // Create a new user
    const newUser = new User({ ...userData, user_email_token });
    const savedUser = await newUser.save();

    // Create a new address
    const newAddress = new Address({
      cleint_id: savedUser._id,
      street_no: userData.street_no,
      street_name: userData.street_name,
      city: userData.city,
      state: userData.state,
      zip: userData.zip,
      country: userData.country,
      created_by: userData.created_by,
      updated_by: userData.updated_by,
      role: "user",
    });

    console.log(newAddress);
    
    await newAddress.save();

    // Send a verification email to the user's email address
    await sendVerificationEmailUser(userData.user_email, user_email_token);

    return res.status(200).json({
      status: "success",
      data: savedUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

/**
 * Handles the login process for a user.
 */
const userLogin = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    if (!user_email || !user_password) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ user_email });

    // Handle various cases for login failure
    if (!user) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "User with this email does not exist",
      });
    }

    if (!user.is_email_verified) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Please verify your email first",
      });
    }

    if (!user.record_status) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Your account has been deactivated. Please contact Consultant",
      });
    }

    
    const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "failed",
        data: {},
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.generateToken(user);
    user.jwtToken = token;
    await user.save();

    return res.status(200).json({
      status: "success",
      data: user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

/**
 * Verifies the user's email based on the verification token.
 */
const verifyUserEmail = async (req, res) => {
  try {
    const token = req.params.token;
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
    res.render("create-password-user", { email }); // Assuming this is a view rendering function
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

/**
 * Sets the password for the user after email verification.
 */
const createPasswordUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user_email = email;
    const user_password = password;
    const user = await User.findOne({ user_email: user_email });

    if (!user) {
      return res.render("404", {
        errorMessage: "It seems you haven't created an account, please register instead.",
      });
    }

    if (user.user_password !== null) {
      return res.render("404", {
        errorMessage: "You have already set your password. Please login instead",
      });
    }

    // Hash the password and save it
    const hashedPassword = await bcrypt.hash(user_password, 10);
    user.user_password = hashedPassword;
    await user.save();

    res.render("password-set-success.ejs"); // Assuming this is a view rendering function
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};


const getUserBasedOnConsultant = async (req, res) => {
  try {
    const consultantId = req.params.id; // Assuming the consultant_id is passed as a route parameter

    const users = await User.find({ user_consultant_id: { $in: [consultantId] } });


    if (!users) {
      return res.status(404).json({
        status: "failed",
        message: "Users not found for the given consultant id",
      });
    }
    return res.status(200).json({
      status: "success",
      data: users,
      message: "Users fetched successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  userSignup,
  userLogin,
  verifyUserEmail,
  createPasswordUser,
  getUserBasedOnConsultant,
};
