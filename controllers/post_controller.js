const Post = require('../models/posts');

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