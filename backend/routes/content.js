const express = require('express');
const router = express.Router();
const blog = require('../controller/blogController');
const review = require('../controller/reviewController');
const { auth, requireRole } = require('../middleware/auth');

// Public content endpoints
router.get('/blogs', blog.list);
router.get('/blogs/:slug', blog.get);

// Reviews
router.get('/reviews', review.list); // admin can filter by status
router.post('/reviews', review.create); // public review creation
router.put('/reviews/:id/status', auth, requireRole('admin'), review.updateStatus); // admin moderate
router.delete('/reviews/:id', auth, requireRole('admin'), review.remove);

// Admin-only blog management
router.post('/blogs', auth, requireRole('admin'), blog.create);
router.put('/blogs/:id', auth, requireRole('admin'), blog.update);
router.delete('/blogs/:id', auth, requireRole('admin'), blog.remove);

module.exports = router;