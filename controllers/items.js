const express = require('express')
const router = express.Router()
const db = require('../models ')


router.post('/item', (req, res) =>{
    db.Item.find()
})


module.exports = router;