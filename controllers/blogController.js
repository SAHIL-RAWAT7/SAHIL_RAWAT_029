import Blog from '../models/Blog.js';
import { uploadToCloudinary } from '../utils/helpers.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user._id;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    let imageURL = null;
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer);
        imageURL = result.secure_url;
      } catch (error) {
        return res.status(500).json({ message: 'Image upload failed' });
      }
    }

    const blog = new Blog({
      title,
      content,
      imageURL,
      authorId
    });

    await blog.save();
    await blog.populate('authorId', 'name email');

    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('authorId', 'name email');
    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('authorId', 'name email');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};