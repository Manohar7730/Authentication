$(document).ready(function () {
    let createPost = () => {
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e) => {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    showNoty('success','Post Published!');
                    newPostForm[0].reset();
                },
                error: function (error) {
                    console.log(error.responseText)
                }
            })
        })
    }

    let newPostDom = function (post) {
        return $(`<li class="post-item" id="post-${post._id}">
        <p class="post-item-content">
                <small><a class="delete-post-button" href="/post/delete/${post._id}">X</a></small>
                ${post.content}
                        <br>
                        <small id="post-user-name">
                        ${post.user.name}
                        </small>
        </p>
        <div class="post-comments">
                <form action="/comment/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add a comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
                    <div class="post-comments-list">
                        <ul id="post-comment-${post._id}">
                            
                        </ul>
                    </div>
        </div>
    </li>`)
    }

    let deletePost = (deleteLink) => {
        $(deleteLink).click((e) => {
            console.log(deleteLink)
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    showNoty('success','post Deleted')
                },
                error: function (error) {
                    console.log(error, responseText)
                }
            })
        })
    }

    $(".delete-post-button").each(function(){
        deletePost($(this));
    })

    let convertPostsToAjax = ()=>{
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
        let postId = self.prop('id').split("-")[1];
        new PostComments(postId);
        })
    }

    createPost();
    convertPostsToAjax();
});

function showNoty(type,message){
    new Noty({
        theme:'relax',
        text: message,
        type:type,
        layout: 'topRight',
        timeout:1500
    }).show();
}