const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.status(200).send({
        message: 'List of orders'
    })
})

router.post('/', (req,res,next)=>{
    const order = {
        mealId: req.body.mealId,
        quantity: req.body.quantity
    }
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