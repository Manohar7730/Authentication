const Post = require('../models/post');

module.exports.home = async (req, res) => {
    try{
        const posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            },
        })
        return res.render('home', {
            title: 'Home Page',
            posts : posts
        });
    }catch(err){
        console.log(err,'Error in creating post');
        return res.status(500).send('Internal Server Error');
    }


};