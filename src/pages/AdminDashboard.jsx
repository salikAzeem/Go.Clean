import { useEffect, useState } from "react";
import langData from "@/lang"; // ✅ ADDED

const AdminDashboard = () => {

  const [reports, setReports] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ LANGUAGE SETUP
  const lang = localStorage.getItem("lang") || "en";
  const t = langData[lang];

  const API = "https://go-clean-8c5n.onrender.com/api/report";

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API}/reports`);
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      fetchReports();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (!isAdmin) {
      window.location.href = "/admin-login";
    } else {
      fetchReports();
    }
  }, []);

  return (

    <div className="px-4 md:px-10 pt-24 pb-20">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        {t.dashboard}
      </h1>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-full max-h-[90vh] rounded"
          />
        </div>
      )}

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-5">

        {reports.map((report) => (

          <div
            key={report._id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >

            <div className="flex justify-between">

              <span className="font-semibold">
                {report.issueType}
              </span>

              <span className="text-sm text-gray-500">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>

            </div>

            <p className="text-sm">
              <strong>{t.user}:</strong> {report.userId?.name || "Unknown"}
            </p>

            <p className="text-sm">
              <strong>{t.email}:</strong> {report.userId?.email || "-"}
            </p>

            <p className="text-sm">
              <strong>Bin:</strong> {report.binId || "Manual"}
            </p>

            <p className="text-sm">
              <strong>Phone:</strong> {report.phone || "-"}
            </p>

            <p className="text-sm">
              <strong>{t.description}:</strong> {report.description || "-"}
            </p>

            {report.image && (
              <img
                src={report.image}
                onClick={() => setSelectedImage(report.image)}
                className="w-full h-auto max-h-52 object-contain rounded mt-2 cursor-pointer"
              />
            )}

            <a
              href={report.location}
              target="_blank"
              className="text-blue-600 underline text-sm"
            >
              {t.viewMap}
            </a>

            <div className="flex justify-between items-center">

              <span className="font-semibold text-sm">
                {t.status}: {report.status || "Pending"}
              </span>

              <div className="flex gap-2">

                <button
                  onClick={() => updateStatus(report._id, "Pending")}
                  className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                >
                  Pending
                </button>

                <button
                  onClick={() => updateStatus(report._id, "In Progress")}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                >
                  Progress
                </button>

                <button
                  onClick={() => updateStatus(report._id, "Completed")}
                  className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                >
                  Done
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full border text-sm">

          <thead className="bg-green-700 text-white">

            <tr>
              <th className="p-3">{t.user}</th>
              <th className="p-3">{t.email}</th>
              <th className="p-3">Bin</th>
              <th className="p-3">Issue</th>
              <th className="p-3">Phone</th>
              <th className="p-3">{t.description}</th>
              <th className="p-3">Image</th>
              <th className="p-3">Location</th>
              <th className="p-3">{t.status}</th>
              <th className="p-3">Action</th>
              <th className="p-3">Date</th>
            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr key={report._id} className="border hover:bg-gray-50">

                <td className="p-3">{report.userId?.name || "Unknown"}</td>
                <td className="p-3">{report.userId?.email || "-"}</td>
                <td className="p-3">{report.binId || "Manual"}</td>
                <td className="p-3">{report.issueType}</td>
                <td className="p-3">{report.phone || "-"}</td>
                <td className="p-3 max-w-xs truncate">{report.description || "-"}</td>

                <td className="p-3">
                  {report.image ? (
                    <img
                      src={report.image}
                      onClick={() => setSelectedImage(report.image)}
                      className="w-16 h-16 object-cover rounded cursor-pointer"
                    />
                  ) : "-"}
                </td>

                <td className="p-3">
                  <a href={report.location} target="_blank" className="text-blue-600 underline">
                    {t.viewMap}
                  </a>
                </td>

                <td className="p-3 font-semibold">
                  <span className={`px-2 py-1 rounded text-black text-xs ${
                    report.status === "Completed"
                      ? "bg-green-600"
                      : report.status === "In Progress"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}>
                    {report.status || "Pending"}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button onClick={() => updateStatus(report._id, "Pending")} className="bg-gray-500 text-black px-2 py-1 rounded text-xs">Pending</button>
                  <button onClick={() => updateStatus(report._id, "In Progress")} className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">Progress</button>
                  <button onClick={() => updateStatus(report._id, "Completed")} className="bg-green-600 text-black px-2 py-1 rounded text-xs">Done</button>
                </td>

                <td className="p-3">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminDashboard;