//using router
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose") 
require("dotenv").config()

ORDER = require("../models/order.js")

router.get("/",async (req,res) =>{
    let userIn = require("../routes/user.js").userInfo
    if (userIn !=null){
        res.render("dashboard/dashboard",{user:userIn.user})
    }else{
        res.redirect('/user/login')
    }
   })

router.get("/orders",async (req,res)=>{
    try{
    let userIn = require("../routes/user.js").userInfo
    console.log("FROM DASHBOARD/ORDERS email= ",userIn.user.email)
     //database connection
mongoose.connect(process.env.atlas1+process.env.atlas2+process.env.atlas3+process.env.atlas4)
var db= mongoose.connection;
db.on('error',()=>{console.log("Error in Connecting to Database")})
db.once('open',()=>{console.log("Connected to Database in DASHBOARD/ORDERS")})



    // let dataFetched = await db.collection("orders").find({user:userIn.user.email})
    var dataFetched = await ORDER.find({user:userIn.user.email})
    console.log(dataFetched)
    let orderObject = dataFetched
    res.render("dashboard/orders",{orders:orderObject})
    }
    catch(err){
        res.redirect('/dashboard')
    }

})


module.exports = router
