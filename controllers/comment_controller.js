const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (req, res) => {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            await post.save();
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in creating a comment', err)
        return res.redirect('back');
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(400).send('Comment not found');
        }
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).send('Post not found');
        }
        if (comment.user == req.user.id || post.user == req.user.id) {
            let postId = comment.post;
            await comment.deleteOne();
            const post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
            return res.redirect('back');
        }
        return res.redirect('back');
    } catch (err) {
        console.log('Error in deleting a comment', err)
        return res.redirect('back');
    }
}