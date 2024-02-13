const bcrypt = require('bcryptjs'); // Import bcryptjs library

async function create_password_consultant(req, res) {
  const { email, password } = req.body;

  const consultant_email = email;
  const consultant_password = password;

  // Hash the password
  const hashedPassword = await bcrypt.hash(consultant_password, 10); // 10 is the number of salt rounds

  const user = await UserConsultant.findOne({ consultant_email });
  if (!user) {
    return res.status(400).json({
      status: "failed",
      data: {},
      message: "It seems you haven't have an account, please register instead.",
    });
  }

  if (user.consultant_password !== null) {
    return res.status(401).json({
      status: "failed",
      data: {},
      message: "You have already set your password. Please login instead",
    });
  }

  user.consultant_password = hashedPassword; // Save hashed password to the user object

  await user.save();
  res.render("password-set-success.ejs");
}
