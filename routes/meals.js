const express = require('express')
const router = express.Router()
const Meal = require('../database/meals')
const mongoose = require('mongoose')
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads/')
    },
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        callback(null, true)
    }
    else {
        callback(null, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

router.get('/',(req,res,next)=>{
   Meal.find()
   .select('name price _id mealImage')  //to ensure we dont get _v property.
   .then(meals => {
       const details = {
           mealCounter: meals.length,
           meals: meals.map(meal=>
            { return {
            name: meal.name,
            price: meal.price,
            mealImage: meal.mealImage,
            _id: meal._id,
            request:{
                type: 'GET',
                url: 'http://localhost:4000/meals/'+ meal._id
            }
           }})
          
       }
       res.status(200).send(details)
   })
   .catch(err => {
       console.log(err)
       res.status(404).send(err)
   })
})

router.post('/', checkAuth, upload.single('mealImage'),(req,res,next)=>{
   console.log(req.file)
    const meal = new Meal({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        mealImage: req.file.path
    });
    meal.save()
    .then(()=>{
        res.status(201).send({
        message: "new meal added",
        createdMeal: meal,
        request:{
            type: 'GET',
            url: 'http://localhost:4000/meals/'+ meal._id
        }
    })
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).send(err)
    })
    
})


router.get('/:mealId', (req,res,next)=>{
    const id = req.params.mealId;
    Meal.findById(id)
    .then(meal => {
        console.log(meal)
        res.status(200).send(meal)
    })
    .catch(err => {console.log(err);
        res.status(500).send(err)
    })
})

router.put('/:mealId', checkAuth, (req,res,next)=>{
    const id = req.params.mealId;
    Meal.updateOne({_id: id}, {
        $set:{
            name: req.body.name,
            price: req.body.price
        }
    })
    .then(result => {
        res.status(200).send({
            message: 'meal updated successfully',
            meal: result,
            request: {
                type: 'GET',
                url: 'http://localhost:4000/meals/' + id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(404).send(err)
    })
})

router.delete('/:mealId', checkAuth, (req,res,next)=>{
    const id = req.params.mealId
   Meal.findByIdAndDelete(id)
   .then((meal)=>{
       console.log("Meal deleted")
       res.send({
           message: 'This meal has been deleted successfully',
           meal: meal
       })
   })
   .catch(err => {
       console.log(err);
       res.status(404).send(err)
   })
})


module.exports = router;