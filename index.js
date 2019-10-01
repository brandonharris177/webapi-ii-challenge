const express = require('express');

const data = require('./data/db');
// const hubsRouter = require('./hubs/hubs-router')

const server = express();

server.use(express.json());

// server.use('/api/hubs', hubsRouter);

port = 5000

server.get('/', (req, res) => {
    res.send('Its working');
  });
  
// watch for connections on port 5000
server.listen(port, () =>
console.log(`Server running on http://localhost:${port}`)
);