const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')

const Order = require('../database/orders')

router.get('/', (req,res,next)=>{
    res.status(200).send({
        message: 'List of orders'
    })
})

router.post('/', (req,res,next)=>{
    const order = new Order({
        // _id: mongoose.Types.ObjectId(),
        meal: req.body.meal,
        quantity: req.body.quantity
    })
    order.save()
    .then(result=>{
        res.status(201).send(result)
    })
    .catch(err=>{
        res.status(404).send(err)
    })
    res.status(201).send({
        message: 'Order created',
        order: order

    })
})

router.get('/:orderId', (req,res,next)=>{
    res.status(200).send({
        message: 'Specific meal/order'
    })
})

module.exports = router;