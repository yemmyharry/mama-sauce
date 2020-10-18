const { user_signup } = require("../controllers/user")
const mongoose = require('mongoose');
const User = require('../database/user')
const userData = {
    email: 'omoyemiarigbanla@gmail.com',
    password: 'password'
}


describe('User Signup Test', () => {

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

    it('should create & save user successfully', async () => {
        const validUser = new User(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
    });

    // it('login successfully', async () => {
    //     const validUser = new User(userData).save();
    //     const savedUser = await validUser.find();
    //     // const signedUser = User.find({email: userData.email});
        
    //     // Object Id should be defined when successfully saved to MongoDB.
    //     // expect(savedUser._id).toBeDefined();
    //     expect(savedUser.email).toBe(userData.email);
    //     // expect(savedUser.password).toBe(userData.password);
    // });

   
    
})