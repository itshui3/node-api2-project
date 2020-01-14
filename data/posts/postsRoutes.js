const express = require('express');
const router = express.Router();
const db = require('../db');

const comments = require('../comments/commentsRoutes');

router.use('/:id/comments', (req, res, next) => {
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
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then( post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch( err => {
      console.log(err);
      res.status(500).send(`Internal server error 500: c ould not retrieve post by id ${id}`);
    })
})
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
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const post = req.body;

  console.log(id, post);

  db.update(id, post)
    .then( id => {
      res.status(200).json(id);
    })
    .catch( err => {
      console.log(err);
      res.status(500).send('Internal server error 500: could not edit post');
    })
})
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then( deleted => {
      console.log(deleted);
      res.status(200).json(deleted);
    })
    .catch( err => {
      console.log(err);
      res.status(500).send('Internal server error 500: could not delete resource')
    })
})

module.exports = router;