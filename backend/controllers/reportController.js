import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  try {
    const { binId, issueType, location, phone, description } = req.body;

    const newReport = new Report({
      binId,
      issueType,
      location,
      phone,
      description,
      image: req.file ? req.file.filename : null,
    });

    await newReport.save();

    res.status(201).json({
      message: "Report submitted successfully",
      report: newReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting report",
      error,
    });
  }
};
export const getReports = async (req, res) => {
  try {

    const reports = await Report.find().sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching reports",
      error
    });

  }
};