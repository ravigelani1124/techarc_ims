const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./config");
function generateToken(user) {

  const payload = {
    userId: user._id,    
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

  //   //console.log("user",user)
  //  if(user.role === 'admin'){
  //    // console.log("user_admin",user.role)
  //     const payload = {
  //       userId: user._id,
  //       email: user.email,
  //       //role: user.role // Include user's role in the JWT payload
  //     };
  //     return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  //   }
  //   else if(user.role === 'consultant'){
  //    // console.log("user_consultant",user.role)
  //     const payload = {
  //       userId: user._id,
  //       email: user.cosultant_email,
  //       //role: user.role // Include user's role in the JWT payload
  //     };
  //     return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  //   }else if(role === 'user'){
  //    // console.log("user_user",user.role)
  //     const payload = {
  //       userId: user._id,
  //       email: user.email,
  //       //role: user.role // Include user's role in the JWT payload
  //     };
  //     return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  //   }
}

module.exports = {
  generateToken,
};
