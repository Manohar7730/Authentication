const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = async (req,res)=>{
    try{
        const post = await Post.findById(req.body.post);
        if(post){
            const comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });
            post.comments.push(comment);
            await comment.save();
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in creating a comment',err)
        return res.redirect('back');
    }
}