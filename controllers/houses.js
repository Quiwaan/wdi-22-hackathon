const express = require('express')
const router = express.Router()
const db = require('../models ')



router.post('/houses', (req, res) => {
    db.Users.find()
})










module.exports = router;