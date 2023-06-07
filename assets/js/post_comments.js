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
                $.ajax({
                    type: 'post',
                    url: '/comment/create',
                    data: $(this).serialize(),
                    success: function(data){
                        console.log(data);
                    },
                    error: function(error){
                        console.log(error.responseText)
                    }
                })
            });
        }
    }