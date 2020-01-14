const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  const postId = req.id_config.id;
  db.findPostComments(postId)
    .then( comments => {
      if (!comments[0]) {
        res.status(404).json({ errorMessage: `The post with the specified ID: ${postId} does not exist.` })
      } else {
        console.log(comments);
        res.status(200).json(comments);
      }
    })
    .catch( err => {
      res.status(500).send(`Internal Server Error, could not retrieve comments at postId ${postId}`)
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
  const comment = req.body;
  const postId = req.id_config.id;
  comment.post_id = postId;
  const insertComment = db.insertComment(comment)
    .then( reso => {
      res.status(200).json(comment);
    })
    .catch( err => {
      console.log(err);
      res.status(500).send(`Internal server error 500: could not add comment at postId ${postId}`);
    })

  if(!req.body.text) {
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
  } else {
    console.log('text included... searching for postId');
    db.findById(postId)
      .then(resolve => {
        if (resolve[0]) {
          console.log('postId found! ...attempting to insert comment', resolve)
          insertComment(comment);
        } else {
          res.status(404).json({ message: `The post with the specified id: ${postId}does not exist.` })
        }
      })
      .catch(err => {
        // this never occurs
      })

  }



  



})

module.exports = router;