const Like = require("../models/likes");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let removeLike = false;

    if (req.query.type === "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    let like = await Like.findOne({
      user: req.user._id,
      likable: req.query.id,
      onModel: req.query.type,
    });

    if (like) {
      removeLike = true;
      likeable.likes.pull(like._id);
      likeable.save();
      await Like.deleteOne({
        _id: like._id,
      });
    } else {
      let like = await Like.create({
        user: req.user._id,
        likable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(like._id);
      likeable.save();
    }

    return res.status(200).json({
      removeLike: removeLike,
      like: like,
      likeCount: likeable.likes.length,
      message: "Request successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
