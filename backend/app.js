const express=require('express');
const{dbConn}=require('./config/db');
const productRoute = require('./routes/Product')
const userRoute=require('./routes/User')
const cors = require('cors')

const app= express()

const port= 4001;
app.use(express.json())
app.use(cors())
app.use('/user',userRoute);
app.use('/product',productRoute)


dbConn();

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})

