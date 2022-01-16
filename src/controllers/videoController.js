

export const trending = (req,res) =>  res.send("<h1>Home page videos</h1>");
export const see = (req,res) =>{
    
    return res.send(`Watch Video #${req.params.id}`);
}
export const edit = (req,res) => res.send("<h1>Edit Videos</h1>");
export const search = (req,res) => res.send("<h1>Search Videos</h1>");
export const upload = (req,res) => res.send("<h1>Upload Videos</h1>");
export const deleteVideo = (req,res) => res.send("<h1>Delete Videos</h1>");
