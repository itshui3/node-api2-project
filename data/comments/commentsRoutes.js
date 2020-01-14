const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
  const id = req.id_config.id;
  console.log(id);
  db.findCommentById(id)
    .then( comment => {
      res.status(200).json(comment);
    })
    .catch( err => {
      res.status(500).send(`Internal Server Error, could not find comment at id ${id}`)
    })

  

})

module.exports = router;