const Comment = require('../models/commentSchema');

exports.upvoteComment = async (commentId, user) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    if (!comment.upVotedBy.includes(user)) {
        comment.upVotedBy = [...comment.upVotedBy, user];
    }

    if (comment.downVotedBy.includes(user)) {
        comment.downVotedBy = comment.downVotedBy.filter((voter) => voter !== user);
    }

    await comment.save();
    return comment;
  } catch (error) {
    console.error('Error updating comment votes:', error);
    throw error;
  }
};

exports.downvoteComment = async (commentId, user) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }

    if (!comment.downVotedBy.includes(user)) {
      comment.downVotedBy = [...comment.downVotedBy, user];
    }

    if (comment.upVotedBy.includes(user)) {
        comment.upVotedBy = comment.upVotedBy.filter((voter) => voter !== user);
    }

    await comment.save();
    return comment;
  } catch (error) {
    console.error('Error updating comment votes:', error);
    throw error;
  }
};