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

router.delete(`/:id`, (req, res) => {
    data.findById(req.params.id)
      .then(post => {
        console.log(post.title)
        if (post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
          data.remove(post)
          res.status(200).json({ message: `${post[0].title} Deleted.` })
        }
      }).catch(error => {
        res.status(500).json({ error: "The post could not be removed" })
      })
    });  

module.exports = router;