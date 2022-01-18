let videos=[{
    id:1,
    title: "first Video",
    rating: 5,
    comments: "good",
    createdAt: "2 min ago",
    views: 200,
},
{
    id:2,
    title: "Second Video",
    rating: 4,
    comments: "very good",
    createdAt: "6 min ago",
    views: 1000,
    },
    {
    id:3,
    title: "third Video",
    rating: 2,
    comments: "so so",
    createdAt: "3 days ago",
    views: 1,
}];
export const trending = (req,res) => {  
    return res.render("home",{pageTitle:`Home`,videos});
}  
export const watch = (req,res) => {
    const {id} = req.params;  // id = req.params.id
    const video = videos[id-1];
    return res.render("watch",{pageTitle:`Watch : ${video.title}`, video});
}
export const getEdit = (req,res) => {
    const {id} = req.params;  
    const video = videos[id-1];
    return res.render("edit",{pageTitle:`Editing : ${video.title}`, video});
}

export const postEdit = (req,res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title;

    return res.redirect(`/videos/${id}`);
}

export const getUpload = (req,res) => {
    return res.render("upload",{pageTitle: 'Upload'});
}

export const postUpload = (req,res) => {
    console.log(req.body);
    const video = {
        id: videos.length+1,
        title: req.body.title,
        rating: parseInt(req.body.rating),
        comments: req.body.comments,
        createdAt: "just now",
        views: 1,
    }
    videos.push(video);
    console.log(videos);
    return res.redirect("/");
}

export const search = (req,res) => res.send("<h1>Search Videos</h1>");
export const upload = (req,res) => res.send("<h1>Upload Videos</h1>");
export const deleteVideo = (req,res) => res.send("<h1>Delete Videos</h1>");
