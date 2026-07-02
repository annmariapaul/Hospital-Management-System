import { useState } from "react";
import api from "../api/axios";
import CustomAlert from "../components/CustomAlert";

export default function CreatePatientModal({
  open,
  onClose,
  onPatientAdded,
}) {
  const [patientName, setPatientName] = useState("");
  const [bedId, setBedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: null,
  });
  if (!open) return null;

  const savePatient = async () => {
    if (!patientName.trim()) {
      setAlert({
        isOpen: true,
        title: "Missing Information",
        message: "Please enter patient name.",
        type: "warning",
      });
      return;
    }

    if (!bedId.trim()) {
      setAlert({
        isOpen: true,
        title: "Missing Information",
        message: "Please enter Bed ID.",
        type: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/patients",
        {
          patient_name: patientName,
          bed_id: bedId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlert({
        isOpen: true,
        title: "Success",
        message: "Patient created successfully.",
        type: "success",
        onConfirm: () => {
          setPatientName("");
          setBedId("");

          if (onPatientAdded) {
            onPatientAdded(res.data.patient);
          }

          onClose();
        },
      });

    } catch (err) {
      setAlert({
        isOpen: true,
        title: "Error",
        message:
          err.response?.data?.message ||
          "Unable to create patient.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">

      <div className="bg-white w-[500px] rounded-lg shadow-2xl">

        {/* Header */}

        <div className="border-b px-6 py-4">

          <h2 className="text-2xl font-semibold">
            Create Patient
          </h2>

        </div>

        {/* Body */}

        <div className="p-6">

          <div className="mb-6">

            <label className="block text-sm font-medium mb-2">
              Patient Name
            </label>

            <input
              type="text"
              value={patientName}
              onChange={(e) =>
                setPatientName(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <div className="mb-8">

            <label className="block text-sm font-medium mb-2">
              Bed ID
            </label>

            <input
              type="text"
              value={bedId}
              onChange={(e) =>
                setBedId(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <div className="flex justify-center gap-5">

            <button
              onClick={savePatient}
              disabled={loading}
              className={`px-8 py-2 rounded-md text-white ${loading
                ? "bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={onClose}
              className="px-8 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
      <CustomAlert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onConfirm={() => {
          const action = alert.onConfirm;

          setAlert({
            isOpen: false,
            title: "",
            message: "",
            type: "info",
            onConfirm: null,
          });

          if (action) {
            action();
          }
        }}
        onClose={() =>
          setAlert({
            isOpen: false,
            title: "",
            message: "",
            type: "info",
            onConfirm: null,
          })
        }
      />
    </div>
  );
}