$(document).ready(function () {
    let createPost = ()=>{
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();
        })
    }
    createPost();
});