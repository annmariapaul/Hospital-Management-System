const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");
const authMiddleware = require("../middleware/authMiddleware");

// Add Patient
router.post("/", authMiddleware, patientController.addPatient);

// Get All Patients
router.get("/", authMiddleware, patientController.getPatients);

// Search Patients
router.get("/search", authMiddleware, patientController.searchPatients);

module.exports = router;