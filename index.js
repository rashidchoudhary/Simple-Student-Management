import express from "express";
import mongoose from "mongoose";
import teacherRouter from "./routes/teacher.js";
import classRouter from "./routes/class.js";
import courseRouter from "./routes/course.js";
import studentRouter from "./routes/student.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/student_management_dev");

const connection = mongoose.connection;

connection.once("connected", () => console.log("Database Connected..."));

connection.on("error", (error) => console.log("Database Error: ", error));

app.use("/teacher", teacherRouter);
app.use("/class", classRouter);
app.use("/course", courseRouter);
app.use("/student", studentRouter);

app.listen(2020, () =>{
    console.log("Server is running on port 2020...")
});

