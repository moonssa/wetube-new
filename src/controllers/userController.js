import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  console.log(req.body);
  const { name, email, username, password, passwordconfirm, location } =
    req.body;
  const dataExist = await User.exists({ $or: [{ username }, { email }] });

  if (password !== passwordconfirm) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match.",
    });
  }
  if (dataExist) {
    console.log("data already exist");
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This username/email  is taken.",
    });
  }

  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.render("login", { pageTitle: "Login" });
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
        pageTitle,
        errorMessage: "An account with this username does not exist",
      });
  }
  const ok = await bcrypt.compare(password, user.password);
  if(!ok){
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "wrong password!!",
    });
  }
  return res.end();
};
export const edit = (req, res) => res.send("<h1>Edit User</h1>");
export const remove = (req, res) => res.send("<h1>Remove User</h1>");
export const see = (req, res) => res.send("<h1> See User</h1>");
export const logout = (req, res) => res.send("<h1> Log out User</h1>");
