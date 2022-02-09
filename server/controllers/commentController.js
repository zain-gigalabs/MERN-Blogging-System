import mongoose from "mongoose";
import Comment from "../schema/comment-schema.js";

const url = 'http://localhost:8000';

export const newComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        comment.save();
        return res.status(200).json('comment saved successfully');

    } catch (e) {
        return res.status(500).json(e);
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.id});
        return res.status(200).json(comments);
    } catch (e) {
        return res.status(500).json(e);
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.delete();
        return res.status(200).json('comment deleted');
    } catch (e) {
        return res.status(500).json(e);
    }
}