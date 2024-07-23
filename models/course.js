import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher"},
    classId: { type: mongoose.Schema.Types.ObjectId,  ref: "Class"},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Course", schema);