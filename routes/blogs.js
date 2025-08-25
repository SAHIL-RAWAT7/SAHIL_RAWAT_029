import express from 'express';
import { createBlog, getAllBlogs, getBlogById } from '../controllers/blogController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/blog', auth, upload.single('image'), createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);

export default router;