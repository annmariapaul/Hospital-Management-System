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
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        {/* Left: username */}
        <div className="text-lg font-semibold">Username</div>

        {/* Right section: tabs + search + logout */}
        <div className="flex items-center space-x-6">
          {/* Tabs */}
          <div className="flex border rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenCreateModal(true)}
              className="px-5 py-2 text-sm font-medium bg-gray-100 text-gray-900"
            >
              Create Patient
            </button>
            <button
              type="button"
              className="px-5 py-2 text-sm font-medium text-gray-600"
            >
              Dashboard
            </button>
          </div>

          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Patient name, Bed ID..."
              className="w-72 pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              {/* simple search icon */}
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-red-500 hover:text-red-600"
          >
            <svg
              className="w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 0a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h5a2 2 0 002-2v-2"
              />
            </svg>
            Log Out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="px-8 py-6">
        {/* Background panel */}
        <div className="bg-gray-50 rounded-lg p-6 min-h-[500px]">
          {filteredPatients.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No patients found. Try creating a new patient.
            </p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="flex flex-col">
                  <span className="mb-2 text-xs font-semibold text-gray-700">
                    Bed {patient.bed_id}
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
        </div>
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