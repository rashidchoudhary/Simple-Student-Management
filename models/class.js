import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    incharge: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher"},
    isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Class", schema);