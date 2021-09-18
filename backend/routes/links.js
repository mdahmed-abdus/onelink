const express = require('express');
const { Link } = require('../models/Link');
const { auth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/new', auth, async (req, res) => {
  const { title, url } = req.body;

  const user = await User.findById(req.user.userId);

  const link = new Link({ title, url });
  user.links.push(link);
  await user.save();

  res.json({ success: true, message: 'New link added', link });
});

module.exports = router;
