const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;
  const tokenWithoutBearer = token.replace(/^Bearer\s/, "");

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    jwt.verify(
      tokenWithoutBearer,
      process.env.PRIVATE_KEY,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            title: "Authentication failed",
            error: err,
          });
        }
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;
