// import { useState } from "react";
// import api from "../api/axios";
// import CustomAlert from "../components/CustomAlert";

// export default function CreatePatientModal({
//   open,
//   onClose,
//   onPatientAdded,
// }) {
//   const [patientName, setPatientName] = useState("");
//   const [bedId, setBedId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//     type: "info",
//     onConfirm: null,
//   });
//   if (!open) return null;

//   const resetForm = () => {
//     setPatientName("");
//     setBedId("");
//   };

//   const savePatient = async () => {
//     if (!patientName.trim()) {
//       setAlert({
//         isOpen: true,
//         title: "Missing Information",
//         message: "Please enter patient name.",
//         type: "warning",
//       });
//       return;
//     }

//     if (!bedId.trim()) {
//       setAlert({
//         isOpen: true,
//         title: "Missing Information",
//         message: "Please enter Bed ID.",
//         type: "warning",
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const res = await api.post(
//         "/patients",
//         {
//           patient_name: patientName,
//           bed_id: bedId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setAlert({
//         isOpen: true,
//         title: "Success",
//         message: "Patient created successfully.",
//         type: "success",
//         onConfirm: () => {
//           resetForm();

//           if (onPatientAdded) {
//             onPatientAdded(res.data.patient);
//           }

//           onClose();
//         },
//       });

//     } catch (err) {
//       setAlert({
//         isOpen: true,
//         title: "Error",
//         message:
//           err.response?.data?.message ||
//           "Unable to create patient.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
//   <div className="w-[300px] bg-white rounded-md shadow-lg border">

//     {/* Header */}
//     <div className="px-4 py-3 border-b">
//       <h2 className="text-[18px] font-semibold text-gray-700">
//         Create Patient
//       </h2>
//     </div>

//     {/* Body */}
//     <div className="px-6 py-5">

//       <div className="mb-4">
//         <label className="block text-[13px] text-gray-600 mb-1">
//           Patient Name
//         </label>

//         <input
//           type="text"
//           value={patientName}
//           onChange={(e) => setPatientName(e.target.value)}
//           className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
//         />
//       </div>

//       <div className="mb-6">
//         <label className="block text-[13px] text-gray-600 mb-1">
//           Bed ID
//         </label>

//         <input
//           type="text"
//           value={bedId}
//           onChange={(e) => setBedId(e.target.value)}
//           className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
//         />
//       </div>

//       <div className="flex justify-center gap-4">
//         <button
//           onClick={savePatient}
//           disabled={loading}
//           className={`w-20 h-9 rounded-md text-sm text-white transition ${
//             loading
//               ? "bg-blue-300"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Saving..." : "Save"}
//         </button>

//         <button
//           onClick={() => {
//             resetForm();
//             onClose();
//           }}
//           className="w-20 h-9 rounded-md border border-red-400 text-red-500 text-sm hover:bg-red-500 hover:text-white transition"
//         >
//           Cancel
//         </button>
//       </div>

//     </div>
//   </div>
// </div>
//     // <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">

//     //   <div className="bg-white w-[500px] rounded-lg shadow-2xl">

//     //     {/* Header */}

//     //     <div className="border-b px-6 py-4">

//     //       <h2 className="text-2xl font-semibold">
//     //         Create Patient
//     //       </h2>

//     //     </div>

//     //     {/* Body */}

//     //     <div className="p-6">

//     //       <div className="mb-6">

//     //         <label className="block text-sm font-medium mb-2">
//     //           Patient Name
//     //         </label>

//     //         <input
//     //           type="text"
//     //           value={patientName}
//     //           onChange={(e) =>
//     //             setPatientName(e.target.value)
//     //           }
//     //           className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
//     //         />

//     //       </div>

//     //       <div className="mb-8">

//     //         <label className="block text-sm font-medium mb-2">
//     //           Bed ID
//     //         </label>

//     //         <input
//     //           type="text"
//     //           value={bedId}
//     //           onChange={(e) =>
//     //             setBedId(e.target.value)
//     //           }
//     //           className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
//     //         />

//     //       </div>

//     //       <div className="flex justify-center gap-5">

//     //         <button
//     //           onClick={savePatient}
//     //           disabled={loading}
//     //           className={`px-8 py-2 rounded-md text-white ${loading
//     //             ? "bg-blue-300"
//     //             : "bg-blue-600 hover:bg-blue-700"
//     //             }`}
//     //         >
//     //           {loading ? "Saving..." : "Save"}
//     //         </button>

//     //         <button
//     //           onClick={() => {
//     //             resetForm();
//     //             onClose();
//     //           }}
//     //           className="px-8 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
//     //         >
//     //           Cancel
//     //         </button>

//     //       </div>

//     //     </div>

//     //   </div>
//     //   <CustomAlert
//     //     isOpen={alert.isOpen}
//     //     title={alert.title}
//     //     message={alert.message}
//     //     type={alert.type}
//     //     onConfirm={() => {
//     //       const action = alert.onConfirm;

//     //       setAlert({
//     //         isOpen: false,
//     //         title: "",
//     //         message: "",
//     //         type: "info",
//     //         onConfirm: null,
//     //       });

//     //       if (action) {
//     //         action();
//     //       }
//     //     }}
//     //     onClose={() =>
//     //       setAlert({
//     //         isOpen: false,
//     //         title: "",
//     //         message: "",
//     //         type: "info",
//     //         onConfirm: null,
//     //       })
//     //     }
//     //   />
//     // </div>
//   );
// }

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

  const resetForm = () => {
    setPatientName("");
    setBedId("");
  };

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
          resetForm();

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
          err.response?.data?.message || "Unable to create patient.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50">

        <div className="w-[380px] bg-white rounded-lg shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-gray-100 border-b border-gray-200 px-5 py-4 rounded-t-lg">
            <h2 className="text-xl font-semibold text-[#666666]">
              Create Patient
            </h2>
          </div>

          {/* Body */}
          <div className="px-7 py-6">

            {/* Patient Name */}
            <div className="mb-5">
              <label className="block text-sm text-gray-700 mb-2">
                Patient Name
              </label>

              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder=""
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Bed ID */}
            <div className="mb-7">
              <label className="block text-sm text-gray-700 mb-2">
                Bed ID
              </label>

              <input
                type="text"
                value={bedId}
                onChange={(e) => setBedId(e.target.value)}
                placeholder=""
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4">

              <button
                onClick={savePatient}
                disabled={loading}
                className={`w-24 h-10 rounded-md text-white text-sm font-medium transition-all duration-200 ${loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="w-24 h-10 rounded-md border border-red-400 text-red-500 text-sm font-medium hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                Cancel
              </button>

            </div>

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
    </>
  );
}