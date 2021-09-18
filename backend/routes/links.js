const express = require('express');
const { User } = require('../models/User');
const { Link } = require('../models/Link');
const { auth } = require('../middleware/authMiddleware');
const { NotFound } = require('../errors/customErrors');

const router = express.Router();

router.post('/new', auth, async (req, res) => {
  const { title, url } = req.body;

  const user = await User.findById(req.user.userId);

  const link = new Link({ title, url });
  user.links.push(link);
  await user.save();

  res.json({ success: true, message: 'New link added', link });
});

router.patch('/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const link = user.links.find((l, i) => l._id.toString() === req.params.id);

  if (!link) {
    throw new NotFound(`Note with id "${req.params.id}" was not found`);
  }

  const { title = link.title, url = link.url } = req.body;

  link.title = title;
  link.url = url;
  await user.save();

  res.json({ success: true, message: 'Link updated', link });
});

router.delete('/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  const link = user.links.find((l, i) => l._id.toString() === req.params.id);

  if (!link) {
    throw new NotFound(`Note with id "${req.params.id}" was not found`);
  }

  await link.remove();
  await user.save();

  res.json({ success: true, message: 'Link deleted', link });
});

module.exports = router;
