const express = require("express")
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const mealRouter = require('./routes/meals')
const orderRouter = require('./routes/orders')
const userRouter = require('./routes/user')
const { static } = require("express")

mongoose.connect('mongodb://localhost:27017/mama-sauce',{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>{
    console.log('connected to mongodb')
})
.catch((err)=> {
    return err.message
})

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))

//to prevent cors errors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE')
        return res.status(200).send({})
    }
    next()
})

app.use('/meals', mealRouter)
app.use('/orders', orderRouter)
app.use('/user', userRouter)


//my error handling
app.use((req,res,next)=>{
    res.status(404).send(new Error)
})

app.listen(4000,()=>{
    console.log("Mama sauce listening at port 4000")
})