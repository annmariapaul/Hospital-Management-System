import React from "react";

export default function PatientCard({ patient }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 border border-gray-100">

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-600">
          {patient.patient_name
            ? patient.patient_name.charAt(0).toUpperCase()
            : "P"}
        </div>
      </div>

      {/* Patient Name */}
      <h2 className="text-xl font-bold text-center text-gray-800">
        {patient.patient_name}
      </h2>

      {/* Bed ID */}
      <p className="text-center text-gray-500 mt-2">
        Bed ID :
        <span className="font-semibold text-gray-700">
          {" "}
          {patient.bed_id}
        </span>
      </p>

      {/* Patient ID (Optional)
      <p className="text-center text-gray-500 mt-1">
        Patient ID :
        <span className="font-semibold text-gray-700">
          {" "}
          {patient.id}
        </span>
      </p> */}

    </div>
  );
}