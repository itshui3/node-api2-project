const express = require('express');
const router = express.Router();
const db = require('../db');

const comments = require('../comments/commentsRoutes');

router.use('/:id/comments', (req, res, next) => {
  console.log('hi');
  req.id_config = {
    id: req.params.id
  }
  next();
}, comments);

router.get('/', (req, res) => {
  db.find()
    .then( posts => {
      res.status(200).json(posts);
      console.log(posts, 'posts');
    })
    .catch( err => {
      console.log(err);
      res.status(500).send('Internal Server Error 500: Could not retrieve posts');
    })
});
router.post('/', (req, res) => {
  db.insert(req.body)
    .then( id => {
      console.log(id);
      res.status(201).json(id);
    })
    .catch( err => {
      console.log(err);
      res.status(500).send('Internal Server Error 500: Could not add post');
    });
});

module.exports = router;