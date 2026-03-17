import PDFDocument from "pdfkit";
import User from "../models/user.js";

export const generateCertificate = async (req, res) => {

  try {

    const { userId, reward } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate.pdf`
    );

    doc.pipe(res);

    doc.fontSize(26).text("Certificate of Appreciation", {
      align: "center"
    });

    doc.moveDown();

    doc.fontSize(18).text(
      `This certificate is proudly awarded to`,
      { align: "center" }
    );

    doc.moveDown();

    doc.fontSize(24).text(user.name, {
      align: "center"
    });

    doc.moveDown();

    doc.fontSize(16).text(
      `For contributing to environmental cleanliness through`,
      { align: "center" }
    );

    doc.moveDown();

    doc.fontSize(18).text(reward, {
      align: "center"
    });

    doc.moveDown(2);

    doc.fontSize(14).text(
      `Issued by GO.CLEAN - Municipal Environmental Initiative`,
      { align: "center" }
    );

    doc.moveDown();

    doc.text(`Date: ${new Date().toLocaleDateString()}`, {
      align: "center"
    });

    doc.end();

  } catch (error) {

    res.status(500).json({
      message: "Certificate generation failed"
    });

  }

};