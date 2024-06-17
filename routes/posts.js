const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Post = require('../models/post');

// Create Post
router.post('/create', auth, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      user: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get Posts with Pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 3;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find().skip(skip).limit(limit).populate('user', ['username']);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Edit Post
router.put('/edit/:id', auth, async (req, res) => {
  const { title, content } = req.body;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete Post
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

    await Post.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
