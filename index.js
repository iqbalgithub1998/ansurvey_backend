const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
// setting cors...............
console.log(process.env.ALLOWED_CLIENTS);
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
};
app.use(cors(corsOptions));

connectDB();
app.use(express.json({ extended: false }));
app.use("/user", require("./routes/api/users"));
app.use("/survey", require("./routes/api/survey"));

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
