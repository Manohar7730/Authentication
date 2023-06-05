$(document).ready(function () {
    let createPost = ()=>{
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                    console.log(data)
                },
                error:function(error){
                    console.log(error)
                }
            })
        })
    }
    createPost();
});