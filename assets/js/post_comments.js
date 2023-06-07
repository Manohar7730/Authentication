class PostComments{
        constructor(postId){
            this.postId = postId;
            this.postContainer = $(`#post-${postId}`)
            this.newCommentForm = $(`#post-${postId}-comments-form`);

            this.createComment(postId);
        }
        createComment(postId){
            let self = this;
            this.newCommentForm.submit(function (e) {
                e.preventDefault();
                // Handle the form submission here
            });
        }
    }