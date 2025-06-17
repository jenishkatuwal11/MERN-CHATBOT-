const User = require("../model/Users");
const { hashPassword } = require("../utils/passwordUtil");

const userRegister = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existUser = await User.findOne({ $or: [{ email }] });
    if (existUser) {
      return res.status(400).json({
        message:
          existUser.email === email
            ? "User already exists with this email"
            : "User already exists with this username",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  userRegister,
};
