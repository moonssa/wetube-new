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
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        email: emailObj.email,
        username: userData.login,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    // render를 사용하면  http://localhost:4000/users/github/finish?code=d65d0745b401d50aedeb url이 노출된다.
    // return res.render("login", { pageTitle: "Login" });
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, username, location },
    file,
  } = req;

  console.log(req.body,req.file);

  // email, username 수정시 같은 이메일 어드레스나 유저네임이 기존에 존재하는지 체크 후 업데이트 한다.
  //const dataExist = await User.exists({$and :[ {$not:{_id}}, { $or: [{ username }, { email } ] }]});
  /*
  const findUsername = await User.findOne({username});
  const findEmail = await User.findOne({email});
  if (findUsername && findUsername._id !== _id) {
    console.log("1111");
    return res
      .status(400)
      .render("edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage:
          "This username or email is already occupied!",
      });
  }

  if (findEmail && findEmail._id !== _id) {
    console.log("2222");
    return res
      .status(400)
      .render("edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage:
          "This username or email is already occupied!",
      });
  }
  */

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  console.log("*** updated User");
  console.log(updatedUser);
  return res.redirect("/users/edit");
};

export const getChangePasswd = (req, res) => {
  return res.render("users/change-passwd", { pageTitle: "Change Password" });
};
export const postChangePasswd = async(req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, confirmPassword },
  } = req;


  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok){
    return res.status(400).render("users/change-passwd", {
      pageTitle: "Change Password",
      errorMessage: "old password is incorrect.",
    });
  }
  
  if (newPassword !== confirmPassword) {
    
    return res.status(400).render("users/change-passwd", {
      pageTitle: "Change Password",
      errorMessage: "password is not matched!!",
    });
  }

  user.password = newPassword;
  await user.save();
  return res.redirect("/users/logout");
};

export const remove = (req, res) => res.send("<h1>Remove User</h1>");
export const see = (req, res) => res.send("<h1> See User</h1>");
