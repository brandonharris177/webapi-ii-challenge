const express = require('express');

// const data = require('./data/db');
const router = require('./Router/Router')

const server = express();

server.use(express.json());

server.use('/api/posts', router);

port = 5000
  
// watch for connections on port 5000
server.listen(port, () =>
console.log(`Server running on http://localhost:${port}`)
);

server.get('/', (req, res) => {
    res.send('Its working from index');
  });