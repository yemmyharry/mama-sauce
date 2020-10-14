const express = require("express")
const app = express()
const morgan = require('morgan')

const mealRouter = require('./routes/meals')
const orderRouter = require('./routes/orders')

//middlewares
app.use(morgan('dev'))
app.use('/meals', mealRouter)
app.use('/orders', orderRouter)


//my error handling
app.use((req,res,next)=>{
    res.status(404).send(new Error)
})

app.listen(4000,()=>{
    console.log("Mama sauce listening at port 4000")
})