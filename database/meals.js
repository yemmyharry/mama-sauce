const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
})

module.exports = mongoose.model('Meal', mealSchema)