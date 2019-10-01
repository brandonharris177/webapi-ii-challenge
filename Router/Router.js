const express = require('express');

const data = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
    const postData =  req.body
    // console.log(req.body)
    // console.log(`post Data`, postData
    if (req.body.title && req.body.contents) {
        // console.log(`title`, req.body.title)
    data.insert(postData)
    .then(id => data.findById(id.id))
    .then(newpost => {
        console.log(`new post`, newpost)
        res.status(201).json(newpost)
    }).catch(error => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
    } else {
    console.log(`got this far`)
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }});

router.post('/', (req, res) => {
    const postData =  req.body
    // console.log(req.body)
    // console.log(`post Data`, postData
    if (req.body.title && req.body.contents) {
        // console.log(`title`, req.body.title)
    data.insert(postData)
    .then(id => data.findById(id.id))
    .then(newpost => {
        console.log(`new post`, newpost)
        res.status(201).json(newpost)
    }).catch(error => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
    } else {
    console.log(`got this far`)
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }});

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

router.get('/:id/comments', (req, res) => {
    data.findById(req.params.id)
    .then(post => {
        console.log(`post`, post)
        if (post.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
        data.findPostComments(req.params.id)
        .then(comments => {
            console.log(req.params.id)
            console.log(`comments`, comments)
            res.status(200).json(comments)
        })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
    });

router.delete(`/:id`, (req, res) => {
    data.findById(req.params.id)
      .then(post => {
        // console.log(post.title)
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

router.put('/:id', (req, res) => {
    const postData =  req.body
    const id = req.params.id
    // console.log(req.body)
    // console.log(`post Data`, postData
    if (req.body.title && req.body.contents) {
       data.findById(id)
       .then(post => {
        // console.log(post.title)
        if (post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
             // console.log(`post Data`, postData)
            data.update(id, postData)
            .then(response => {
            // console.log(`id`, id)
            if (response === 1) {
                // console.log(id)
                data.findById(id)
                .then(updatedPost => {
                //  console.log(`updated post`, updatedpost)
                res.status(200).json(updatedPost)})
            } else {
                res.status(500).json({ error: "Server Error" })
            }}).catch(error => {
            res.status(500).json({ error: "The post information could not be modified." })
            })
        }})
    } else {
        res.status(400).json({ Message: "Please provide title and contents for the post." })}
    });

module.exports = router;

