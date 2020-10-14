const express = require('express')
const router = express.Router()
const Meal = require('../database/meals')

router.get('/',(req,res,next)=>{
    res.send({
        message: "list of meals"
    })
})

router.post('/',(req,res,next)=>{
   
    const meal = new Meal({
        name: req.body.name,
        price: req.body.price
    });
    res.status(201).send({
        message: "meal item added",
        createdMeal: meal
    })
})


router.get('/:mealId', (req,res,next)=>{
    const id = req.params.mealId;
    if(id === 'special'){ 
        res.status(200).send({
            message: 'You discovered the special ID',
            id: id
        })
    } else {
        res.status(200).send({
            message: "You passed an ID"
        })
    }
})

router.put('/:mealId',(req,res,next)=>{
    res.send({
        message: "meal updated"
    })
})

router.delete('/:mealId',(req,res,next)=>{
    res.send({
        message: "meal deleted"
    })
})


module.exports = router;