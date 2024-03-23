const express = require('express');
const { Comments } = require('../../db/models');
const { createComment } = require('../../controllers/comments');
const { Router } = require('express')

const Route = Router()

// Create a new comment for a particular post
Route.post('/:postId', async (req, res) => {
    const { title, body } = req.body;
    const { postId, userId } = req.params;

    try {
        const comment = await createComment(postId, userId, title, body);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all comments for a particular post
Route.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comments.findAll({
            where: { postId }
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = {
    commentsRoute: Route
};
