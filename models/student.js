import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Student", schema);