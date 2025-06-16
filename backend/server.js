const express = require("express");
const connectDB = require("./db/dbConnect");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8001;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
