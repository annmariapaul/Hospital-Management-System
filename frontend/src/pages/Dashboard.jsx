import { useEffect, useState } from "react";
import api from "../api/axios";
import PatientCard from "../components/PatientCard";
import CreatePatientModal from "../components/CreatePatientModal";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
export default function PatientDashboard() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: null,
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(res.data);
      } catch (err) {
        setAlert({
          isOpen: true,
          title: "Error",
          message:
            err.response?.data?.message || "Unable to fetch patients.",
          type: "error",
        });
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.patient_name?.toLowerCase().includes(term) ||
      String(p.bed_id).toLowerCase().includes(term)
    );
  });

  const handlePatientAdded = (patient) => {
    setPatients((prev) => [patient, ...prev]);
  };

  const handleView = (patient) => {
    // plug in your view logic / navigation here
    console.log("View", patient);
  };

  const handleEdit = (patient) => {
    // plug in your edit logic here
    console.log("Edit", patient);
  };

  const handleDelete = (id) => {
    setAlert({
      isOpen: true,
      title: "Delete Patient",
      message: "Are you sure you want to delete this patient?",
      type: "delete-confirm",
      onConfirm: async () => {
        try {
          const token = localStorage.getItem("token");

          await api.delete(`/patients/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setPatients((prev) =>
            prev.filter((p) => p.id !== id)
          );

          setAlert({
            isOpen: true,
            title: "Deleted",
            message: "Patient deleted successfully.",
            type: "success",
            onConfirm: null,
          });

        } catch (err) {
          setAlert({
            isOpen: true,
            title: "Error",
            message:
              err.response?.data?.message ||
              "Unable to delete patient.",
            type: "error",
            onConfirm: null,
          });
        }
      },
    });
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    setAlert({
      isOpen: true,
      title: "Logout",
      message: "Are you sure you want to logout?",
      type: "confirm",
      onConfirm: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
      },
    });
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navigation */}
      <header className="bg-white">

        {/* Top Row */}
        <div className="h-12 px-8 flex justify-between items-center bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)] z-10 relative">

          <h1 className="text-[18px] font-semibold text-gray-800">
            {user?.username || user?.name || "Username"}
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-[12px] text-red-500 hover:text-red-600"
          >
            <svg
              className="w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 20H5V4h8"
              />
            </svg>

            Log Out
          </button>

        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between h-14 bg-white">

          {/* Left */}
          <div className="flex h-full">

            <div className="w-52 border-r border-gray-200 flex items-center justify-center">

              <button
                type="button"
                onClick={() => setOpenCreateModal(true)}
                className="px-6 py-2 bg-gray-200 rounded-xl text-[15px] font-bold text-black hover:bg-gray-300 transition"
              >
                Create Patient
              </button>

            </div>

            <button
              type="button"
              className="w-44 border-r border-gray-200 text-[15px] font-bold text-black hover:bg-gray-50 transition"
            >
              Dashboard
            </button>

          </div>

          {/* Search */}
          <div className="flex items-center pr-8">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Patient name, Bed ID..."
              className="w-[140px] h-[24px] px-2 text-[10px] border border-gray-400 rounded-[5px] outline-none"
            />

            <button className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
            </button>

          </div>

        </div>

      </header>

      {/* Main content */}
      <main className="px-8 py-6 bg-gray-100 min-h-[calc(100vh-112px)]">

        {filteredPatients.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No patients found. Try creating a new patient.
          </p>
        ) : (
          <div className="flex flex-wrap items-start gap-10 pl-2">

            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex flex-col items-center"
              >
                <span className="mb-3 text-[18px] font-semibold text-gray-600">
                  {patient.bed_id}
                </span>

                <PatientCard
                  patient={patient}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

              </div>
            ))}

          </div>
        )}

      </main>

      {/* Create Patient modal */}
      <CreatePatientModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onPatientAdded={handlePatientAdded}
      />
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
        onCancel={() =>
          setAlert({
            isOpen: false,
            title: "",
            message: "",
            type: "info",
            onConfirm: null,
          })
        }
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