const Post = require('../models/posts');

module.exports.home = async (req, res) => {
    try{
        const posts = await Post.find({}).populate('user');
        return res.render('home', {
            title: 'home',
            posts : posts
        });
    }catch(err){
        console.log(err,'Error in creating post');
        return res.redirect('back');
    }


};