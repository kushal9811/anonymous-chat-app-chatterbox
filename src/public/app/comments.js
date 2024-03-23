// comments.js
// function loadComments(postId,userId) {
//     // Make a GET request to fetch comments for the specified post
//     $.get(`http://localhost:8383/api/comment/${postId}`, (comments) => {
//       const commentsContainer = $('#body');
//       const commentTitle = $('#title')
//       //commentsContainer.empty(); // Clear previous comments
//       //commentTitle.empty();
//       console.log(comments)
//       for (let comment of comments) {
//         commentsContainer.append(
//           $(`
//           <div class="col-12">
//             <div class="card m-2">
//               <div class="card-body">
//                 <p>Title</p>
//                 <p class="card-text">${comment.title}</p></br>
//                 <p>Body</p>
//                 <p class="card-text">${comment.body}</p>
//               </div>
//             </div>
//           </div>
//           `)
//         );
//       }
//     });
//   }
function loadComments(postId, userId) {
    $.get(`http://localhost:8383/api/comment/${postId}`, function(response) {
        // Check if the response is an array and has at least two arrays
        if (Array.isArray(response) && response.length >= 2) {
            const comments = response[1]; // Access the second array containing comments
            
            if (comments.length === 0) {
                console.log("No comments available for this post.");
                return;
            }
            
            console.log(comments);
            
            for (let comment of comments) { // Corrected syntax for the loop
                $('#body').append(`
                    <div class="col-12">
                        <div class="card m-2">
                            <div class="card-body">
                                <p>Title</p>
                                <!-- <p class="card-text">${comment.title}</p></br> Corrected access to comment.title -->
                                <p>Body</p>
                                <!-- <p class="card-text">${comment.body}</p> Corrected access to comment.body -->
                            </div>
                        </div>
                    </div>
                `);
            }
        } else {
            console.error("Unexpected response format:", response);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching comments:", textStatus, errorThrown);
    });
  }
  
  
  
  
  
    
    function addComment(postId, text) {
      // Make a POST request to add a new comment to the specified post
      $.post(`/api/comments/${postId}`, { text }, () => {
        // Reload comments after adding a new comment
        loadComments(postId);
      });
    }
    