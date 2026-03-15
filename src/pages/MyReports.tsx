import { useEffect, useState } from "react";

const MyReports = () => {

  const [reports, setReports] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {

    const fetchReports = async () => {

      if (!user) return;

      try {

        const res = await fetch(
          `https://go-clean-8c5n.onrender.com/api/user/${user._id}/reports`
        );

        const data = await res.json();

        setReports(data);

      } catch (error) {
        console.error("Error fetching reports:", error);
      }

    };

    fetchReports();

  }, [user]);


  if (!user) {
    return (
      <div className="pt-24 text-center">
        <h2 className="text-xl font-semibold">
          Please login to see your reports
        </h2>
      </div>
    );
  }

  return (

    <div className="pt-24 px-4 md:px-10 pb-20">

      <h1 className="text-2xl font-bold mb-6">
        My Reports
      </h1>

      {reports.length === 0 && (
        <p className="text-gray-500">
          No reports submitted yet.
        </p>
      )}

      <div className="space-y-4">

        {reports.map((report) => (

          <div
            key={report._id}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
          >

            <div>

              <p className="font-semibold">
                {report.issueType}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded text-white text-sm
              ${
                report.status === "Completed"
                  ? "bg-green-600"
                  : report.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            >

              {report.status || "Pending"}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyReports;