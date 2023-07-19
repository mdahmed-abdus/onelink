const express = require('express');
const { User } = require('../models/User');
const { Link } = require('../models/Link');
const { auth } = require('../middleware/authMiddleware');
const catchAsyncErr = require('../middleware/catchAsyncErr');
const validateId = require('../middleware/validateId');
const { BadRequest, NotFound } = require('../errors/customErrors');
const {
  newLinkSchema,
  updateLinkSchema,
} = require('../validation/linkValidator');
const validate = require('../validation/validate');

const router = express.Router();

router.param('id', validateId);

router.post(
  '/new',
  auth,
  catchAsyncErr(async (req, res) => {
    const errMessage = validate(newLinkSchema, req.body);
    if (errMessage) {
      throw new BadRequest(errMessage);
    }

    const { title, url } = req.body;

    const user = await User.findById(req.user.userId);

    const link = new Link({ title, url });
    user.links.push(link);
    await user.save();

    res.json({ success: true, message: 'New link added', link });
  })
);

router.patch(
  '/:id',
  auth,
  catchAsyncErr(async (req, res) => {
    const errMessage = validate(updateLinkSchema, req.body);
    if (errMessage) {
      throw new BadRequest(errMessage);
    }

    const { id } = req.params;
    const user = await User.findById(req.user.userId);
    const link = user.links.find((l, i) => l._id.toString() === id);

    if (!link) {
      throw new NotFound(`Note with id "${id}" was not found`);
    }

    const { title = link.title, url = link.url } = req.body;

    link.title = title;
    link.url = url;
    await user.save();

    res.json({ success: true, message: 'Link updated', link });
  })
);

router.delete(
  '/:id',
  auth,
  catchAsyncErr(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user.userId);
    const link = user.links.find((l, i) => l._id.toString() === id);

    if (!link) {
      throw new NotFound(`Note with id "${id}" was not found`);
    }

    await link.remove();
    await user.save();

    res.json({ success: true, message: 'Link deleted', link });
  })
);

module.exports = router;
