const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const checkAuth = require('../middleware/check-auth')
const Order = require('../database/orders')
const Meal = require('../database/meals')

router.get('/', checkAuth, (req,res,next)=>{
    Order.find()
    .select('mealId quantity _id')
    .populate('mealId', 'name')
    .then(results =>{
         res.status(200).send({
        message: 'List of orders',
        orders: results.map( result =>{
            return {
                _id: result._id,
                mealId: result.mealId,
                quantity: result.quantity,
                request:{
                    type: 'GET',
                    url: 'http://localhost:4000/orders/' + result._id
                }
            }
        })  
    })
    })
    .catch(err=>{
        res.status(404).send(err)
    })
   
})

router.post('/', checkAuth, (req,res,next)=>{
    Meal.findById(req.body.mealId)
    .then( result => {
        if(!result) {
            return res.status(404).send({
                message: "MEALID NOT FOUND"
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            mealId: req.body.mealId,
            quantity: req.body.quantity
        })
    
        return order
        .save()
    })
        .then( (result)=>{
            res.status(201).send({
                message: 'Order created',
                createdOrder: {
                    _id: result._id,
                    meal: result.meal,
                    quantity: result.quantity
                },
                request:{
                    type: 'GET',
                    url: 'http://localhost:4000/orders/' + result._id
                }
            })
        } )
        .catch(err => {
            res.status(500).send({
                message: "Meal not found",
                error: err
            })
        })
    })
    

router.get('/:orderId', checkAuth, (req,res,next)=>{
    Order.findById(req.params.orderId)
    .populate('mealId')
    .then(order => {
        if(!order){
            return res.status(404).send({
                message: "Order not found"
            })
        }
        res.status(200).send({
            order: order,
            request:{
                type: 'GET',
                url: 'http://localhost:4000/orders/'
            }
        })
    })
    .catch(
        err => {
            res.status(404).send(err)
        }
    )
})

router.delete('/:orderId', checkAuth,(req,res,next)=>{
    Order.findByIdAndDelete({_id: req.params.orderId})
    .then(result => {
        res.status(200).send({
            message: 'Order deleted successfully',
        })
    })
    .catch(err => {
        res.status(404).send(err)
    })
})

module.exports = router;