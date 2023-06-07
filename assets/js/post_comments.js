class PostComments {
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);
    }

    createComment(postId) {
        let self = this;
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $(this).serialize(),
                success: function (data) {
                    let newComment = self.newCommentDom(data.data.comment, data.data.post);
                    $(`#post-comment-${self.postId}`).append(newComment);
                    self.newCommentForm[0].reset();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    newCommentDom(comment, post) {
        return $(`<li class="comment-item" id="comment-${comment._id}">
            <p class="comment-item-content">
                <small><a class="delete-comment-button" href="/comment/delete/${post._id}/${comment._id}">X</a></small>
                ${comment.content}
            </p>
            <small id="comment-user-name">
                ${comment.user.name}
            </small>
        </li>`);
    }
}
