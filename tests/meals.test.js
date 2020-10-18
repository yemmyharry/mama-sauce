const mongoose = require('mongoose');
const Meal = require('../database/meals')
const mealData = {
    name: 'Rice and weed sauce',
    price: '$300'
}


describe('Meals Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('should create a new meal successfully', async () => {
        const newMeal = new Meal(mealData);
        const savedMeal = await newMeal.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedMeal._id).toBeDefined();
        expect(savedMeal.name).toBe(mealData.name);
        expect(savedMeal.price).toBe(mealData.price);
    });



   
    
})