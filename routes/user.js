const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../database/user')


router.post('/signup', (req, res, next)=>{
        User.find({email: req.body.email})
        .then(
            user => {
                if(user.length >=1){
                    return res.status(409).send({
                        message: 'Email already exists'
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash)=>{
                        if(err){
                            return res.status(500).send({
                                message: "error"
                            })
                        } else {
                            const user = new User({
                                email: req.body.email,
                                password: hash
                        })
                        user
                        .save()
                        .then(result => {
                            console.log(result)
                            res.status(201).send({
                                message: 'User Created'
                            })
                        })
                        .catch(err => {
                            res.status(404).send(err)
                        })
            
                    
                }})
                }

            }
        )
        
})


router.delete('/:userId',(req, res, next)=>{
    User.remove({_id: req.params.userId})
    .then(result => {
        res.status(200).send({
            message: 'User deleted successfully'
        })
    })
    .catch(err =>{
        res.status(404).send(err)
    })
})



module.exports = router;