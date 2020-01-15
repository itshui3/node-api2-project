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
      res.status(500).json({ error: "Internal Server Error 500: Could not retrieve posts" });
    })
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then( post => {
      if(!post[0]) {
        res.status(404).json({ errorMessage: `The post with the specified ID: ${id} does not exist` })
      } else {
        console.log(post);
        res.status(200).json(post);
      }

    })
    .catch( err => {
      console.log(err);
      res.status(500).send(`Internal server error 500: could not retrieve post by id ${id}`);
    })
})
// client post to /api/posts
router.post('/', (req, res) => {

  if(!req.body.title || !req.body.contents) {
    console.log(req.body);
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {

    db.insert(req.body)
      .then( id => {
        console.log(id);
        res.status(201).json(req.body);
      })
      .catch( err => {
        console.log(err);
        res.status(500).send('Internal Server Error 500: Could not save post to database');
      });
  }

});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const post = req.body;

  console.log(id, post);
  const updatePost = () => db.update(id, post)
    .then( id => {
      res.status(200).json(post);
    })
    .catch( err => {
      console.log(err);
      res.status(500).send('Internal server error 500: could not edit post');
    });

  if(!post.title || !post.contents) {
    res.status(400).json({ errorMessage: `Please provide title and/or contents for the post.` })
  } else {

    db.findById(id)
      .then( postAtId => {
        if(!postAtId[0]) {
          res.status(404).json({ errorMessage: `The post with the specified ID: ${id} does not exist.` })
        } else {
          updatePost(id, post);
          
        }
      })
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then( post => {
      if(!post[0]) {
        res.status(404).json({ errorMessage: `The post with the specified ID: ${id} does not exist.` })
      } else {
        db.remove(id)
          .then( deleted => {
            console.log(deleted);
            res.status(200).json(post);
          })
          .catch( err => {
            console.log(err);
            res.status(500).send('Internal server error 500: could not delete resource')
          })
      }
    })


})

module.exports = router;