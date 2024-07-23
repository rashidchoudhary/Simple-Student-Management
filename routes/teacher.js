import express from "express";
const router = express.Router();
import teacherModel from "../models/teacher.js";

router.get("/", async (req,res) =>{
    try{
        const data = await teacherModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //finding courses of a teacher
                $lookup: {
                    from: "courses",
                    localField: "_id",
                    foreignField: "",
                    as: "courses",
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
    const data = await teacherModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await teacherModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await teacherModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await teacherModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;