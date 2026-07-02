const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Patient = sequelize.define(
  "Patient",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bed_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "patients",
    timestamps: false,
  }
);

module.exports = Patient;