const express = require('express');

const data = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    data.find()
    .then(posts => {
        res.status(200).json(posts)
    }).catch(error => {
        res.end()
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
});

router.get('/', (req, res) => {
    Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  });
  
router.get('/:id', (req, res) => {
data.findById(req.params.id)
.then(post => {
    if (post.length === 0) {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
    res.status(200).json(post);
    }
})
.catch(error => {
    res.status(500).json({ error: "The post information could not be retrieved." });
});
});

module.exports = router;