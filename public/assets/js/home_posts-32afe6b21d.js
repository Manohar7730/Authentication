function showNoty(t,e){new Noty({theme:"relax",text:e,type:t,layout:"topRight",timeout:1500}).show()}$(document).ready((function(){let t=function(t){return $(`<li class="post-item" id="post-${t._id}">\n        <p class="post-item-content">\n                <small><a class="delete-post-button" href="/post/delete/${t._id}">X</a></small>\n                ${t.content}\n                        <br>\n                        <small id="post-user-name">\n                        ${t.user.name}\n                        </small>\n                        <br>\n                        <small>\n                              \n                                  <a class="toggle-like-button" data-likes="${t.likes.length}" href="/likes/toggle/?id=${t._id}&type=Post">\n                                  <span class="like-count">${t.likes.length} likes</span>\n                                  </a>\n                              \n                          </small>\n  \n        </p>\n        <div class="post-comments">\n                <form action="/comment/create" method="post">\n                    <input type="text" name="content" placeholder="Type here to add a comment...">\n                    <input type="hidden" name="post" value="${t._id}">\n                    <input type="submit" value="Add Comment">\n                </form>\n                    <div class="post-comments-list">\n                        <ul id="post-comment-${t._id}">\n                            \n                        </ul>\n                    </div>\n        </div>\n    </li>`)},e=t=>{$(t).click((e=>{e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),showNoty("success","post Deleted")},error:function(t){console.log(t,responseText)}})}))};$(".delete-post-button").each((function(){e($(this))}));(()=>{let n=$("#new-post-form");n.submit((s=>{s.preventDefault(),$.ajax({type:"post",url:"/post/create",data:n.serialize(),success:function(s){let o=t(s.data.post);$("#post-list-container>ul").prepend(o),e($(" .delete-post-button",o)),new PostComments(s.data.post._id),new ToggleLike($(" .toggle-like-button",o)),showNoty("success","Post Published!"),n[0].reset()},error:function(t){console.log(t.responseText)}})}))})(),$("#post-list-container>ul>li").each((function(){let t=$(this).prop("id").split("-")[1];new PostComments(t)}))}));