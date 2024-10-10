const User = require("../models/userSchema");
const Comment = require("../models/commentSchema");

// create comment
exports.createComment = async (req, res) => {
  console.log("req in commmnet controller", req);

  try {
    const complaintId = req.params.complaintId;
    console.log(complaintId);
    const { comment } = req.body;
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    const userName = userDetails.firstName + " " + userDetails.lastName;
    console.log("userName: ", userName);

    if (complaintId) {
      const createComment = await Comment.create({
        text: comment,
        userName: userName ? userName : "admin",
        complaintId,
        userId,
      });
      return res.status(200).json({
        success: true,
        message: "Commented Successfully",
        createComment,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "complaint Id not found in create complaints",
      });
    }
  } catch (error) {
    console.log("error in creating comments ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// get comments

exports.getComment = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    console.log(complaintId);

    if (complaintId) {
      const comment = await Comment.find({
        complaintId: complaintId,
      }).sort({ createdAt: "desc" });
      return res.status(200).json({
        success: true,
        message: "Getting Comment Successfully",
        comment,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "complaint Id not found in get comments",
      });
    }
  } catch (error) {
    console.log("error in Geting comments ", error);
    return res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// like comment
exports.likeComment = async (req, res) => {
  try {
    console.log("Inside like comment controller");
    const { commentId } = req.body;
    const userEmail = req.user.email;

    console.log(commentId, userEmail);
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $addToSet: { upVotedBy: userEmail },
        $pull: { downVotedBy: userEmail },
      },
      { new: true }
    );

    console.log("!!!!!!!!!", updatedComment);
    res.status(200).json({
      success: true,
      message: "Comment has been liked!",
      updatedComment,
    });
  } catch (error) {
    console.log("error in like comment: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// dislike comment
exports.dislikeComment = async (req, res) => {
  try {
    console.log("Inside dislike comment controller");
    const { commentId } = req.body;
    const userEmail = req.user.email;

    console.log(commentId, userEmail);
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $addToSet: { downVotedBy: userEmail },
        $pull: { upVotedBy: userEmail },
      },
      { new: true }
    );

    console.log(updatedComment);
    res.status(200).json({
      success: true,
      message: "Comment has been disliked!",
      updatedComment,
    });
  } catch (error) {
    console.log("error in dislike comment: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};