class PostComments {
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);
        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
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
                    $(`#post-comment-${self.postId}`).prepend(newComment);
                    self.deleteComment($(' .delete-comment-button',newComment));
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

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            let commentId = $(deleteLink).attr('href').split('/').pop();

            $.ajax({
                type : 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${commentId}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })

        })
    }
}
