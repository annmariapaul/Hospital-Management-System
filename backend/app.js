const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log("MySQL Connected Successfully");
  })
  .catch((err) => {
    console.error("Database Connection Failed:", err);
  });

app.get("/", (req, res) => {
  res.send("Hospital Management API is Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
module.exports = app;