
const fakeUser = {
    userName : "moonssam",
    loggedIn : false,
};

export const trending = (req,res) => {
    const videos=[];
    return res.render("home",{pageTitle:"home", fakeUser, videos});
}
    
export const see = (req,res) => res.render("watch",{pageTitle:"watch"});
export const edit = (req,res) => res.render("edit",{pageTitle:"edit"});
export const search = (req,res) => res.send("<h1>Search Videos</h1>");
export const upload = (req,res) => res.send("<h1>Upload Videos</h1>");
export const deleteVideo = (req,res) => res.send("<h1>Delete Videos</h1>");
