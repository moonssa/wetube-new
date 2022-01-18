import express from "express";
import { 
        watch, 
        getEdit,
        postEdit,  
        getUpload,
        postUpload, 
        deleteVideo 
} from "../controllers/videoController";


const videoRouter=express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete",deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;