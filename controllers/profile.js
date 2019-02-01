const express = require('express')
const router = express.Router()

var loggedIn = require('../middleware/loggedIn');



router.get('/', (req, res) =>{
    res.send('/profile')
})


module.exports = router;