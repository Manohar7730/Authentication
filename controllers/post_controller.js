const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create  = async(req,res)=>{
    try{
        const post = await Post.create({
            content:req.body.content,
            user : req.user._id
        })
        return res.redirect('back');
    }catch(err){
        console.log(err,'Error in creating post');
        return res.redirect('back');
    }
}

module.exports.destroy = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.deleteOne();
            await Comment.deleteMany({post : req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err,'Error in removing post');
        return res.redirect('back');
    }
}