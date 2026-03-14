import { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {

      const res = await fetch(
        "https://go-clean-8c5n.onrender.com/api/report/reports"
      );

      const data = await res.json();

      setReports(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Waste Reports Dashboard
      </h1>

      <table className="w-full border">

        <thead className="bg-green-700 text-white">

          <tr>
            <th className="p-3">Bin ID</th>
            <th className="p-3">Issue</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Description</th>
            <th className="p-3">Location</th>
            <th className="p-3">Date</th>
          </tr>

        </thead>

        <tbody>

          {reports.map((report) => (

            <tr key={report._id} className="border hover:bg-gray-50">

              <td className="p-3">{report.binId || "Manual"}</td>

              <td className="p-3">{report.issueType}</td>

              <td className="p-3">
                {report.phone ? report.phone : "-"}
              </td>

              <td className="p-3 max-w-xs truncate">
                {report.description ? report.description : "-"}
              </td>

              <td className="p-3">

                <a
                  href={report.location}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Map
                </a>

              </td>

              <td className="p-3">
                {new Date(report.createdAt).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AdminDashboard;