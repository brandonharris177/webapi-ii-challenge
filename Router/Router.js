const express = require('express');

const data = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    res.json('its working')
})

module.exports = router;