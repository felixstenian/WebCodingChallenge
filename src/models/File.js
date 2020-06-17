import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    content: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("File", FileSchema);
