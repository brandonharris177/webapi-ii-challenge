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

module.exports = router;