const express = require("express");
const connectDB = require("./db/dbConnect");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");
const botRoutes = require("./routes/botRoutes.js");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", botRoutes);

connectDB();

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
