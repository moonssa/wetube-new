import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";
import res from "express/lib/response";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: `Home`, videos });
};

export const watch = async (req, res) => {
  const { id } = req.params; // id = req.params.id
  const video = await Video.findById(id).populate("owner").populate("comments");

  if (!video) {
    req.flash("error", " Not authorized");
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const video = await Video.findById(id);

  if (!video) {
    req.flash("error", " Video not found");
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const {
    user: { _id },
  } = req.session;

  const video = await Video.exists({ _id: id });
  if (!video) {
    req.flash("error", " Video not found");
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the the owner of the video.");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;

  const {
    user: { _id },
  } = req.session;

  const isHeroku = process.env.NODE_ENV === "production";
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: isHeroku? video[0].location : video[0].path,
      thumbUrl: isHeroku? thumb[0].location : thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload",
      errorMessage: error._message,
    });
  }
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        //$regex: new RegExp(`^${keyword}`, "i")
        //$regex: new RegExp(`${keyword}$`, "i")
        $regex: new RegExp(`${keyword}`, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const upload = (req, res) => res.send("<h1>Upload Videos</h1>");

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views += 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.status(201).json({ newCommentId: comment._id });
};
