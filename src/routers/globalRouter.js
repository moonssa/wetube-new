import express from "express";

const handleHome = (req,res) => {
    return res.send("<h1>Home</h1>");
}

const globalRouter = express.Router();
globalRouter.get("/", handleHome);

export default globalRouter;