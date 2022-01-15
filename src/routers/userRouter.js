import express from "express";

const handleEditUsers = (req,res) => {
    return res.send("<h1>User Edit</h1>");
}

const userRouter=express.Router();
userRouter.get("/edit", handleEditUsers);

export default userRouter;