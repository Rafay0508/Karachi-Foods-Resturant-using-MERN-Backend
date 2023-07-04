const express = require("express");
const app = express();
const adminRoutes = require("./routes/adminRoute");
const userRoutes = require("./routes/userRoute");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
app.use(express.json());
dotenv.config();
connectDB();
app.use(cors());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("server started at port " + process.env.PORT);
});

console.log("hello");
