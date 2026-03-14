import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  binId: {
    type: String,
  },
  issueType: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Report", reportSchema);