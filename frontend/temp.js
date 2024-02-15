const jwt = require('jsonwebtoken');

// Example function to generate JWT during user authentication
const generateJWT = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role // Include user's role in the JWT payload
  };
  return jwt.sign(payload, 'secret', { expiresIn: '1h' });
};

// Middleware function to verify JWT and check user role
const verifyJWT = (req, res, next) => {
  // Extract JWT from headers, query string, or cookies
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  // Verify JWT
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }
    
    // Extract user role from decoded JWT payload
    const { role } = decoded;

    // Attach user's role to request object for further use
    req.userRole = role;

    next();
  });
};

// Example protected route using the verifyJWT middleware
app.get('/api/admin', verifyJWT, (req, res) => {
  // Access user's role from request object
  const userRole = req.userRole;

  // Perform authorization check based on user's role
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden. Admin access required.' });
  }

  // Authorized access for admin role
  res.json({ message: 'Admin API accessed successfully.' });
});
