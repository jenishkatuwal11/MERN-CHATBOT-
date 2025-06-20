const express = require("express");
const connectDB = require("./db/dbConnect");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes.js");
const botRoutes = require("./routes/botRoutes.js");

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-domain.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", botRoutes);

connectDB();

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
