const Post = require('../models/post');
const Comment = require('../models/comment');
const comments_mailer = require('../mailers/comments_mailer');

module.exports.create = async (req, res) => {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            await post.comments.push(comment);
            await post.save();
            await comment.populate('user','name email');
            comments_mailer.newComment(comment);
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment : comment,
                        post : post
                    },
                    message : "comment Created"
                })
            }
            req.flash('success','Comment created for this post')
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err)
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
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id : req.params.id,
                        post_id: req.params.postId,
                    },
                    message : "comment Created"
                })
            }
            req.flash('success','comment removed from this post')
            return res.redirect('back');
        }
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err)
        return res.redirect('back');
    }
}