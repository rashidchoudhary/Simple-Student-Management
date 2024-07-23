import express from "express";
const router = express.Router();
import courseModel from "../models/course.js";

router.get("/", async (req,res) =>{
    try{
        const data = await courseModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //finding teachers of a specific course
                $lookup: {
                    from: "teachers",
                    localField: "teacherId",
                    foreignField: "_id",
                    as: "teachers",
                },
            },
            {
                // finding classes who are studying a specific course
                $lookup: {
                    from: "classes",
                    localField: "classId",
                    foreignField: "_id",
                    as: "classes",
                },
            },
        ]);
        res.json({message: "Data fetched successfully", data});
    } catch({message}){
        res.json({message});
    }
});

router.get("/:id", async (req,res) =>{
    try{
    const data = await courseModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await courseModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await courseModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await courseModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;