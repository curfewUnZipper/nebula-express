//using router
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose") 

router.get("/",(req,res) =>{
    res.render('order/order')
    //database connection
    mongoose.connect("mongodb://localhost:27017/orderDetails")
    var db= mongoose.connection;
    db.on('error',()=>{console.log("Error in Connecting to Database")})
    db.once('open',()=>{console.log("Connected to Database in ORDERS")})
    })
   
   
router.get("/test",(req,res) =>{
    res.render('order')
    })


//order page 

// router.post("/",(req,res)=>{
//     //console.log(req.body);
//     var data = [];
//     for (i=0;i<req.body.name.length;i++){
//         if (req.body.name[i]!='' && 
//             req.body.post[i]!='' &&
//             req.body.size[i]!=''){
//         data.push({
//                     "name":req.body.name[i],
//                     "post":req.body.post[i],
//                     "size":req.body.size[i]
//                   })
//         }else{continue;}
//     } console.log("Data array ready"+'\n'+JSON.stringify(data));
//     db.collection("orders").insertMany(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }console.log("Order Placed Successfully")
//     })
//     return res.redirect("/shop")
// })



module.exports = router