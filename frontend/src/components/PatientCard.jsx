
import React from "react";

export default function PatientCard({
  patient,
  onView,
  onEdit,
  onDelete,
}) {
 return (
  <div
    className="
      w-[110px]
      h-[150px]
      bg-white
      border-2
      border-green-500
      rounded-md
      flex
      items-center
      justify-center
      mx-auto
    "
  >
    <h2 className="text-[11px] font-semibold text-gray-600 text-center uppercase px-2 break-words">
      {patient.patient_name}
    </h2>
  </div>
);
}
