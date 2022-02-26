import Video from "../models/Video";
import User from "../models/User";
import res from "express/lib/response";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: `Home`, videos });
};

export const watch = async (req, res) => {
  const { id } = req.params; // id = req.params.id
  const video = await Video.findById(id).populate("owner");

  if (!video) {
    req.flash("error"," Not authorized" );
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
    req.flash("error"," Video not found" );
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
    req.flash("error"," Video not found" );
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error","You are not the the owner of the video.");
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
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {video, thumb} = req.files;
  const { title, description, hashtags } = req.body;
  //const { path: fileUrl } = req.file;
  const {
    user: { _id },
  } = req.session;

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl:video[0].path,
      thumbUrl: thumb[0].path,
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
  console.log("search keyword", keyword);
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        //$regex: new RegExp(`^${keyword}`, "i")
        //$regex: new RegExp(`${keyword}$`, "i")
        $regex: new RegExp(`${keyword}`, "i"),
      },
    }).populate("owner");
    console.log("***", videos);
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
