const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const auth = require("../verifyToken")

// Create a post (POST /posts) 
router.post('/', auth, async (req, res) => {
    const { title, description } = req.body;

    // BCheck if title and description is present. Could have used joi for this
    if (!title || !description) {
        return res.status(400).send({ message: "Title and description are required" });
    }

    const post = new Post({
        title,
        description,
        createdBy: req.user._id, 
    });

    try {
        const savedPost = await post.save();
        res.status(201).send(savedPost);
    } catch (err) {
        res.status(500).send({ message: 'Server Error', error: err });
    }
});

// Get all posts 
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ message: 'Server Error', error: err });
    }
});

// Get a  post by ID. No auth
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send(post);
    } catch (err) {
        res.status(500).send({ message: 'Server Error', error: err });
    }
});

// Update a post 
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Check if the user is the creator of the post
        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'You are not authorized to update this post' });
        }

        
        const { title, description } = req.body;
        if (title) post.title = title;
        if (description) post.description = description;

        const updatedPost = await post.save();
        res.status(200).send(updatedPost);
    } catch (err) {
        res.status(500).send({ message: 'Server Error', error: err });
    }
});

// Delete a post 
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Check if the user is the creator of the post
        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'You are not authorized to delete this post' });
        }

        
        await post.deleteOne({ _id: id });
        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server Error', error: err });
    }
});

module.exports = router;
