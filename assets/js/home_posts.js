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
                    console.log(data);
                },
                error: function (error) {
                    console.log(error)
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
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                    console.log(error, responseText)
                }
            })
        })
    }

    createPost();
});