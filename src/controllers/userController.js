import User from "../models/User.js";
import fetch from "node-fetch";
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
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "wrong password!!",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  console.log("URL***", finalUrl);
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenReq = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  console.log(tokenReq);

  if ("access_token" in tokenReq) {
    const { access_token } = tokenReq;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if(!emailObj){
      return res.redirect("/login");
    }
    const existingUser = await User.findOne({email:emailObj.email});
    if(existingUser){
      req.session.loggedIn = true;
      req.session.user = existingUser;
      return res.redirect("/");
    }
    const user = await User.create({
      name: userData.name,
      email: emailObj.email,
      username: userData.login,
      password:"",
      socialOnly: true,
      location: userData.location,
    });
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
    
  } else {
    // render를 사용하면  http://localhost:4000/users/github/finish?code=d65d0745b401d50aedeb url이 노출된다.
    // return res.render("login", { pageTitle: "Login" });
    return res.redirect("/login");
  }
};

export const edit = (req, res) => res.send("<h1>Edit User</h1>");
export const remove = (req, res) => res.send("<h1>Remove User</h1>");
export const see = (req, res) => res.send("<h1> See User</h1>");
export const logout = (req, res) => res.send("<h1> Log out User</h1>");
