const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
    try{
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
        const user = await User.find({});
        return res.render('home', {
            title: 'Home Page',
            posts : posts,
            all_users : user
        });
    }catch(err){
        console.log(err,'Error in creating post');
        return res.status(500).send('Internal Server Error');
    }


};