const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) =>{
    console.log('inside new comment mailer',comment);
    nodemailer.transporter.sendMail({
        from : '123alonemanu@gmail.com',
        to : comment.user.email,
        subject : 'new comment published',
        html : '<h1>Yup, your comment is published<h1>'
    },(err,info)=>{
        if(err){
            console.log('error in sending the mail',err);
            return ;
        }
        console.log('message sent',info);
        return;
    })
}