const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  const postId = req.id_config.id;
  db.findPostComments(postId)
    .then( comments => {
      res.status(200).json(comments);
    })
    .catch( err => {
      res.status(500).send(`Internal Server Error, could not find comments at postId ${postId}`)
    })
})
router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  db.findCommentById(id)
    .then( comment => {
      res.status(200).json(comment);
    })
    .catch( err => {
      console.log(err);
      res.status(500).send(`Internal Server Error 500, could not find comment by id ${id}`)
    })
})
router.post('/', (req, res) => {
  const post = req.body;
  console.log(post);
  const id = req.id_config.id;

  db.insertComment(post)
    .then( reso => {
      res.status(200).json(reso);
    })
    .catch( err => {
      console.log(err);
      res.status(500).send(`Internal server error 500: could not add comment at postId ${id}`);
    })
})

module.exports = router;