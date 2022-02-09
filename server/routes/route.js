import express, {Router} from "express";
import {createPost, deletePost, getAllPosts, getPost, updatePost} from "../controllers/postController.js";
import {uploadImage, getImage} from "../controllers/imageController.js";
import upload from '../utils/upload.js'
import {getComments, newComment,deleteComment} from "../controllers/commentController.js";

const router = express.Router();

router.post('/create', createPost);
router.get('/posts', getAllPosts);
router.get('/post/:id', getPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/comment/new', newComment);
router.get('/comments/:id', getComments);
router.delete('/comment/delete/:id', deleteComment);

export default router;