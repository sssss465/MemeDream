const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/:img/upvote', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/:img/downvote', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
