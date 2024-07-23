import express from "express";
const router = express.Router();
import classModel from "../models/class.js";

router.get("/", async (req,res) =>{
    try{
        const data = await classModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                //finding incharge of a class
                $lookup: {
                    from: "teachers",
                    localField: "incharge",
                    foreignField: "_id",
                    as: "incharge",
                },
            },
            {
                //finding courses of a class
                $lookup: {
                    from: "courses",
                    localField: "_id",
                    foreignField: "classId",
                    as: "courses",
                },
            },
        ]);
        res.json({ message: "Data fetched successfully", data });
    } catch({message}){
        res.json({message});
    }
});

router.get("/:id", async (req,res) =>{
    try{
    const data = await classModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await classModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await classModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await classModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;