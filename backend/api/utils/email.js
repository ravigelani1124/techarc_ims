
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const generateVerificationToken = () => {
    return crypto.randomBytes(20).toString("hex");
  };

  
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


// Function to send a verification email
async function sendVerificationEmailUser(email, token) {
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


  module.exports = {generateVerificationToken,sendVerificationEmailUser

}