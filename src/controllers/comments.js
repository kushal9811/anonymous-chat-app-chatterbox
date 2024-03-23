const { Comments } = require('../db/models');

// Create a new comment
async function createComment(postId, userId, title, body) {
    try {
        const comment = await Comments.create({
            title,
            body,
            postId,
            userId
        });
        return comment;
    } catch (error) {
        throw error;
    }
}

// Export the functions
module.exports = {
    createComment
};
