const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "1d",
    });
    return token;
  } catch (error) {
    console.error(" Error generating token:", error.message);
    return null;
  }
};

//  Extract Token from Request
const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
  }
  return null;
};
