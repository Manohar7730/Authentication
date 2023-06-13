const Post = require('../../../models/post');

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