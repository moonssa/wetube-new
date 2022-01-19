import Video from "../models/Video";



export const home = async (req,res) => {  
    const videos = await Video.find({});
    return res.render("home",{pageTitle:`Home`,videos});
}  

export const watch = async(req,res) => {
    const {id} = req.params;  // id = req.params.id
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle:"Video not found"});
    }
    return res.render("watch",{pageTitle: video.title, video});
}

export const getEdit = async(req,res) => {
    const {id} = req.params;  
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle: "Video not found" });
    }
    return res.render("edit",{pageTitle: `Edit: ${video.title}`, video});
}

export const postEdit = (req,res) => {
    const { id } = req.params;
    const { title } = req.body;
    console.log(req.body);

    return res.redirect(`/videos/${id}`);
}

export const getUpload = (req,res) => {
    return res.render("upload",{pageTitle: 'Upload'});
}

export const postUpload = async (req,res) => {
    const { title, description, hashtags } = req.body;
    try{
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map((word)=>
                !word.trim().startsWith("#")? `#${word.trim()}`: word.trim()),
        });
        return res.redirect("/");
    } catch (error){
       
        return res.render("upload",{
                pageTitle: 'Upload', 
                errorMessage: error._message 
        });
    }   
}

export const search = (req,res) => res.send("<h1>Search Videos</h1>");
export const upload = (req,res) => res.send("<h1>Upload Videos</h1>");
export const deleteVideo = (req,res) => res.send("<h1>Delete Videos</h1>");
