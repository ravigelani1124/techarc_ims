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

const sendUserAppointmentEmail = async (appointmentData, consultant, user) => {
  const mailOptions = {
    from: "techarc@gmail.com",
    to: user.user_email,
    subject: "Appointment Booking Confirmation",
    html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Booking</title>
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
                        <h2>Appointment Booking Confirmation</h2>
                    </div>
                    <div class="content">
                        <p>Dear ${appointmentData.user_name},</p>
                        <p>Your appointment has been successfully booked with us. Please find the details below:</p>
                        
                        <div>
                            <h3>Application Details:</h3>
                            <p><strong>Application:</strong> ${appointmentData.application_code} :  ${appointmentData.application_type}</p>                            
                            <p><strong>Sub Application:</strong> ${appointmentData.appsub_code} : ${appointmentData.appsub_type}</p>                            
                        </div>
                        
                        <div>
                            <h3>Timeslot Information:</h3>
                            <p><strong>Date:</strong> ${appointmentData.timeslot_date}</p>
                            <p><strong>Start Time:</strong> ${appointmentData.timeslot_start_time}</p>
                            <p><strong>End Time:</strong> ${appointmentData.timeslot_end_time}</p>
                        </div>
      
                        <div>
                            <h3>Consultant Details:</h3>
                            <p><strong>Name:</strong> ${consultant.consultant_name_en}</p>
                            <p><strong>Contact:</strong> ${consultant.consultant_email}, ${consultant.consultant_phone}</p>                            
                            <p><strong>Address:</strong> ${consultant.street_no}, ${consultant.street_name},
                             ${consultant.city}, ${consultant.state}, ${consultant.zip}, ${consultant.country}</p>                            
                        </div>

                        <div>
                        <h3>Price Details:</h3>
                        <p><strong>Consultant Fees:</strong> ${appointmentData.consultant_fee}</p>                                                
                        </div>
                                                
                        <p>If you have any questions or need to make changes, please contact us.</p>
                        <p>Best Regards,<br/>TechArc</p>
                    </div>
                </div>
            </body>
            </html>
        `,
  };

  await transporter.sendMail(mailOptions);
};

const sendConsultantAppointmentEmail = async (
  appointmentData,
  consultant,
  user
) => {
  const mailOptions = {
    from: "techarc@gmail.com",
    to: consultant.consultant_email,
    subject: "Appointment Booking Confirmation",
    html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Booking</title>
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
                        <h2>Appointment Booking Confirmation</h2>
                    </div>
                    <div class="content">
                        <p>Dear ${appointmentData.consultant_name},</p>
                        <p>You have been successfully booked as a consultant for the following appointment:</p>
                        
                    <div>
                        <h3>Application Details:</h3>
                        <p><strong>Application:</strong> ${appointmentData.application_code} : ${appointmentData.application_type}</p>                        
                        <p><strong>Sub Application:</strong> ${appointmentData.appsub_code}: ${appointmentData.appsub_type}</p>                        
                    </div>
                    
                    <div>
                        <h3>Timeslot Information:</h3>
                        <p><strong>Date:</strong> ${appointmentData.timeslot_date}</p>
                        <p><strong>Start Time:</strong> ${appointmentData.timeslot_start_time}</p>
                        <p><strong>End Time:</strong> ${appointmentData.timeslot_end_time}</p>
                    </div>
  
                    <div>
                            <h3>User Details:</h3>
                            <p><strong>Name:</strong> ${user.user_name_en}</p>
                            <p><strong>Contact Details:</strong> ${user.user_email}, ${user.user_phone}</p>                            
                            <p><strong>Address:</strong> ${user.street_no}, ${user.street_name},
                             ${user.city}, ${user.state}, ${user.zip}, ${user.country}</p>                                                        
                        </div>
                                     
                        <h3>Price Details:</h3>
                        <p><strong>Consultant Fees:</strong> ${appointmentData.consultant_fee}</p>                                                
                        </div>

                        <p>If you have any questions or need to make changes, please contact us.</p>
                        <p>Best Regards,<br/>TechArc</p>
                    </div>
                </div>
            </body>
            </html>
        `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  generateVerificationToken,
  sendVerificationEmailUser,
  sendUserAppointmentEmail,
  sendConsultantAppointmentEmail,
};
