
import React from "react";

export default function PatientCard({
  patient,
  onView,
  onEdit,
  onDelete,
}) {
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

      {/* Bed */}

      <p className="text-center text-gray-500 mt-1">
        Bed ID :
        <span className="font-semibold text-gray-700">
          {" "}
          {patient.bed_id}
        </span>
      </p>



      {/* Buttons */}

      <div className="flex justify-end mt-4">
        <button
          onClick={() => onDelete(patient.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Delete
        </button>
      </div>

    </div>
  );
}
