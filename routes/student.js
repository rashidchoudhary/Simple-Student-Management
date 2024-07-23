import express from "express";
const router = express.Router();
import stdentModel from "../models/student.js";

router.get("/", async (req,res) =>{
    try{
        const data =  await stdentModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                $sort: {
                    name: 1,                
                },
            },
            {
                //finding class of student
                $lookup: {
                    from: "classes",
                    localField: "classId",
                    foreignField: "_id",
                    as: "class",
                    pipeline: [
                        {
                            //finding course of student using the class collection
                            $lookup: {
                                from: "courses",
                                localField: "_id",
                                foreignField: "classId",
                                as: "courses",
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    isDeleted: 0,
                    __v: 0,
                    classId: 0,
                },
            },
        ]);
        res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.get("/:id", async (req,res) =>{
    try{
    const data = await stdentModel.findById(req.params.id);
    res.json(data);
    } catch({message}){
        res.json({message});
    }
});

router.post("/", async (req,res) =>{
    try{
    const data = await stdentModel.create(req.body);
    res.status(200).json({meassage: "Data added successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.patch("/:id",  async (req,res) =>{
    try{
        const data = await stdentModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({meassage: "Data updated successfully",data});
    } catch({message}){
        res.json({message});
    }
});

router.delete("/:id", async (req,res) =>{
    try{
        const data = await stdentModel.findByIdAndUpdate(req.params.id, {isDeleted: true,});
        res.status(200).json({meassage: "Data deleted successfully", data});
    } catch({message}){
        res.json({message});
    }
});

export default router;