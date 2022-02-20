import mongoose from "mongoose";

/*
export const formatHashtags = (hashtags) =>
  hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
*/

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 30 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  fileUrl: {type: String, required: true},
  createdAt: { type: Date, required: true, default: Date.now },
  owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));

});

const Video = mongoose.model("Video", videoSchema);
export default Video;
