require('dotenv').config()
require('./Connection/db')

const express=require('express')
const cors=require('cors')
const router=require('./Router/router')
//const jwt = require('./Middlewares/jwtMiddleware')


const pfServer=express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
//pfServer.use(jwt)

const PORT=3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log("Server running at : ",PORT)
})

pfServer.get('/',(req,res)=>{
    res.send("<h1>Request is Hit</h1>")
})