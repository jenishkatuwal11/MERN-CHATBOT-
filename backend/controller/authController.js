const { OAuth2Client } = require("google-auth-library");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (req, res) => {
  const { token } = req.body;
  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Validate the token is for your app
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // If the user doesn't exist, create a new user without a password
      user = new User({
        firstname: given_name,
        lastname: family_name,
        email,
        password: null, // Set password as null for Google OAuth users
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      token: jwtToken, // Return JWT token
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { verifyGoogleToken };
