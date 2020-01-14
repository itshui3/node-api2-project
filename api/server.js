const express = require('express');
const server = express();
const cors = require('cors');
server.use(express.json());
server.use(cors());

const postsRoutes = require('../data/posts/postsRoutes')

server.use('/api/posts', postsRoutes);

server.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome to WebAPI-2</h1>`);
})

module.exports = server;