import User from "../models/User.js";


export const getJoin = (req,res) => {
    return res.render("join", {pageTitle : "Join"});
}

export const postJoin = async(req,res) => {
    console.log(req.body);
    const { name, email, username, password, location} = req.body;
    try {
        await User.create({
            name, 
            email, 
            username, 
            password, 
            location,
        });
        return res.redirect("/login");
    }catch(error){
        return res.redirect("/");
    }
}
export const edit = (req,res) => res.send("<h1>Edit User</h1>");
export const remove = (req,res) => res.send("<h1>Remove User</h1>");
export const login = (req,res) => res.send("<h1> Login User</h1>");
export const see = (req,res) => res.send("<h1> See User</h1>");
export const logout = (req,res) => res.send("<h1> Log out User</h1>");