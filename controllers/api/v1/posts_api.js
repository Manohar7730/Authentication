const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async (req,res)=>{

    const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            options: { sort: {createdAt: -1}},
            populate: {
                path: 'user',
            },
        })

    return res.json({
        message : "all posts",
        posts : posts
    })
}

module.exports.destroy = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
            await post.deleteOne();
            await Comment.deleteMany({post : req.params.id});

            return res.status(200).json({
                message : 'post and associated comments deleted'
            })
        
    }catch(err){
        req.flash('error',err)
        return res.status(500).json({message:'Error in deleting'})
    }
}