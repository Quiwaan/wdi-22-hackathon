require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../models')

router.post('/login', (req, res) => {
    console.log('in the Post /auth/login route')
     console.log(req.body);
    
     //find out if user is in db
    
     db.User.findOne({ email: req.body.email })
     .then(user => {
         if(!user || !user.password){
             return res.status(400).send('user not found')
         }
    
         //the user exists check password
         if(!user.isAuthenticated(req.body.password)){
             //invaild user 
             return res.status(401).send('invaild cred')
         }
    
         //vaild user passed auth. need a token
         const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60  * 60 * 24 // 24 hours (in seconds)
        })
    
         res.send({ token: token })
     })
     .catch(err => {
         console.log('Error when finding user in POST /auth/login route:', err)
         res.status(503).send('database error:(')
     })
    });
    
    // POST /auth/signup route - create a user in the DB and then log them in
    router.post('/signup', (req, res) => {
        //debug statements; remove when no loger needed
     console.log('in the Post /auth/signup route')
     console.log(req.body);
    
    db.User.findOne({ email: req.body.email })
    .then(user => {
        if(user){
            //if the user exists, dont let them create anothoer account
            return res.status(422).send('email already in use')
        }
        //they dont exist yet
    
        db.User.create(req.body)
        .then(createdUser => {
            //create a token 
            const token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60  * 60 * 24 // 24 hours (in seconds)
            })
    
            res.send({ token: token })
    
        })
        .catch(err =>{
            console.log('error in post /auth/signup when creating new user', err)
            res.status(500).send('database error:(')
        })
    })
    .catch(err => {
        console.log('error in POST /auth/signup', err)
        res.status(503).send('database error. sad day. :(')
    })
    
    });
    
    // This is what is returned when client queries for new user data
    router.post('/current/user', (req, res) => {
        //remove this console log when not needed anymore
        console.log('get /auth/current/user', req.user)
    
        if(!req.user || !req.user.id){
            return res.status(401).send({ user: null })
        }
    
        db.User.findById(req.user.id)
        .then(user => {
            res.send({ user: user })
        })
        .catch(err => {
            console.log('error in get /auth/current/user route:', err)
            res.status(503).send(({ user: null }))
        })
    
    
    });
    
    module.exports = router;
    