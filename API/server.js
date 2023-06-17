const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const config = require('./config');
const Product = require('./models/Vegetable')
const app= express()

app.use(cors()); // to resolve the cross domain/port api call issue
//middleware for application to understand json
app.use(express.json());



const vegetablesRouter = require('./routes/Vegetable');
const farmRouter = require('./routes/Farm');
const memberRouter = require('./routes/Member');
const profileRouter = require('./routes/Profile');
const userRouter = require('./routes/User');
const scheduledDeliveryRouter = require('./routes/ScheduledDelivery');

app.use('/api/vegetables', vegetablesRouter);
app.use('/api/farm', farmRouter);
app.use('/api/member', memberRouter);
app.use('/api/profile', profileRouter);
app.use('/api/user', userRouter);
app.use('/api/scheduledDelivery',scheduledDeliveryRouter);


//MongoDB Connection
mongoose
.connect(config.mongoURI)
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('Node api app is running on port 3000')
    }) 
}).catch((error)=>{
    console.log(error)
})