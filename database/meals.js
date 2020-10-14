const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
    name: String,
    price: Number
})

module.exports = mongoose.model('Meal', mealSchema)