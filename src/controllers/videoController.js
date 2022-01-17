
const fakeUser = {
    userName : "moonssam",
    loggedIn : false,
};

export const trending = (req,res) => {
    const videos=[{
        id:1,
        title: "first Video",
        rating: 5,
        comments: "good",
        views: 200,
    },
    {
        id:2,
        title: "Second Video",
        rating: 4,
        comments: "very good",
        views: 1000,
        },
        {
        id:3,
        title: "third Video",
        rating: 2,
        comments: "so so",
        views: 4,
        },
    ];
    return res.render("home",{pageTitle:"home", fakeUser, videos});
}
    
export const see = (req,res) => res.render("watch",{pageTitle:"watch", fakeUser});
export const edit = (req,res) => res.render("edit",{pageTitle:"edit", fakeUser});
export const search = (req,res) => res.send("<h1>Search Videos</h1>");
export const upload = (req,res) => res.send("<h1>Upload Videos</h1>");
export const deleteVideo = (req,res) => res.send("<h1>Delete Videos</h1>");
