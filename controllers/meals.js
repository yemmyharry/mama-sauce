const Meal = require('../database/meals')
const mongoose = require('mongoose')

exports.get_all_meals = (req,res,next)=>{
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
 }

 exports.create_meal = (req,res,next)=>{
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
     
 }


 exports.get_one_meal = (req,res,next)=>{
    const id = req.params.mealId;
    Meal.findById(id)
    .then(meal => {
        console.log(meal)
        res.status(200).send(meal)
    })
    .catch(err => {console.log(err);
        res.status(500).send(err)
    })
}


exports.update_meal = (req,res,next)=>{
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
}

exports.delete_meal = (req,res,next)=>{
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
}