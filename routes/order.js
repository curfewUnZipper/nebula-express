//using router
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose") 
    //database connection
mongoose.connect("mongodb://localhost:27017/orderDetails")
var db= mongoose.connection;
db.on('error',()=>{console.log("Error in Connecting to Database")})
db.once('open',()=>{console.log("Connected to Database in ORDERS")})


router.get("/",(req,res) =>{
res.render('order/order')

    })
   
   
router.get("/test",(req,res) =>{
    res.render('order')
    })


//order page 

router.post("/",(req,res)=>{
    let keys= Object.keys(req.body);
    // console.log(keys[0])
    // console.log(req.body[keys[0]][0])
    var data = {};
    var current = {}
    for (i=0;i<req.body[keys[0]].length;i++){
        current = {}
        for(j=0;j<keys.length;j++){
            current[keys[j]]=req.body[keys[j]][i]
        }
        data[`person${i}`]=current

    } console.log("Data array ready"+'\n'+JSON.stringify(data));
    db.collection("orders").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }console.log("Order Placed Successfully")
    })





    return res.redirect("/shop")
})



module.exports = router