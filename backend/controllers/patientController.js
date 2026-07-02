const { Patient } = require("../models");
const { Op } = require("sequelize");

// Add Patient
exports.addPatient = async (req, res) => {
  try {
    const { patient_name, bed_id } = req.body;

    if (!patient_name || !bed_id) {
      return res.status(400).json({
        message: "Patient name and Bed ID are required",
      });
    }

    const patient = await Patient.create({
      patient_name,
      bed_id,
      user_id: req.user.id,
    });

    res.status(201).json({
      message: "Patient added successfully",
      patient,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Patients of Logged-in User
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: {
        user_id: req.user.id,
      },
      order: [["id", "DESC"]],
    });

    res.status(200).json(patients);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Search Patient
exports.searchPatients = async (req, res) => {
  try {
    const { search } = req.query;

    const patients = await Patient.findAll({
      where: {
        user_id: req.user.id,
        [Op.or]: [
          {
            patient_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            bed_id: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      order: [["id", "DESC"]],
    });

    res.status(200).json(patients);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};