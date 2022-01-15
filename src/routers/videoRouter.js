import express from "express";

const handleWatchVideos = (req,res) => {
    return res.send("<h1>Watch Video</h1>");
}

const videoRouter=express.Router();
videoRouter.get("/watch", handleWatchVideos);

export default videoRouter;