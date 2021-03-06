const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../database/user')


exports.user_signup = (req, res, next)=>{
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
    
}


exports.user_login = (req,res,next)=>{
    User.find({email: req.body.email})
    .then(user =>{
        if(user.length < 1){
            return res.status(401).send({
                message: "You don't have the required authorisation"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if (err){
                return res.status(401).send({
                    message: "You don't have the required authorisation"
                })
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 'secret', {
                    expiresIn: "1h"
                })
                return res.status(200).send({
                    message: 'Authentication successful',
                    token: token 
                })
            }
        })
    })
}


exports.delete_user = (req, res, next)=>{
    User.remove({_id: req.params.userId})
    .then(result => {
        res.status(200).send({
            message: 'User deleted successfully'
        })
    })
    .catch(err =>{
        res.status(404).send(err)
    })
}