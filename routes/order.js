//using router
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("dotenv").config()

    //database connection
mongoose.connect(process.env.atlas1+process.env.atlas2+process.env.atlas3+process.env.atlas4)
var db= mongoose.connection;
db.on('error',()=>{console.log("Error in Connecting to Database")})
db.once('open',()=>{console.log("Connected to Database in ORDERS")})

const orderSchema = new mongoose.Schema({User: String,
    order: Object})
ORDER = mongoose.model("shirts", orderSchema)


//variables for usage
let orderProduct=0;
// let userDeets = require("../routes/user.js").userInfo  || {prsnt:1,user:{email:"fake@fake.com",name:"fake",admin:true}}
// console.log("current user", userDeets.user)

router.get("/",(req,res) =>{
    let users = require("../routes/user.js").userInfo || {prsnt:1,user:{email:"fake@fake.com",name:"fake",admin:true}}
    // console.log("from get/: ", users.user)
    if (users.user==null){
        res.redirect("/user/login")
        console.log("Sign-in/Register")    
    }else{
        console.log("----Bypased Login for Testing in order.js at get(\"lh:3000/order\")-----")
res.render('order/fields',{orderProduct:orderProduct, user:users.user})
    }
})
    
// router.get("/fillFields", (req,res)=>{
//     console.log("reached fillFields GET")
//     res.render("order/adminFillFields") //enterFields
// })   

router.post("/orderPreference", (req,res)=>{
    orderProduct = req.body.color.split(',',3)
    res.redirect("/order")
})

router.post("/fillFields",(req,res)=>{
    let users = require("../routes/user.js").userInfo || {prsnt:1,user:{email:"fake@fake.com",name:"fake",admin:true}}
    console.log(users.user.admin)
    req.body.field = req.body.field.filter(function (element){
        return element != ''
    })
        console.log("in custom fields post",req.body)
    if (users.user.admin == true){
        res.render("order/adminFillFields")
    }
    else if (users.user.admin ==false){
        res.render("order/userFillFields")
        
    }
})

//order page
router.post("/",(req,res)=>{
    let users = require("../routes/user.js").userInfo || {prsnt:1,user:{email:"fake@fake.com",name:"fake",admin:true}}
    let keys= Object.keys(req.body);
    console.log(keys[0])
    console.log(req.body[keys[0]].length) //no. of tshirts
    var data = {User:users.user.email, order:{}};
    data.order[data.order.length]={}
    var current = {}
    for (i=0;i<req.body[keys[0]].length;i++){
        current = {}
        for(j=0;j<keys.length;j++){
            current[keys[j]]=req.body[keys[j]][i]
        }
        
        data.order[data.order.length][`person${i}`]=current
        console.log(typeof order)
        console.log(data)
    // } console.log("Data array ready"+'\n'+JSON.stringify(data));
    // db.collection("orders").insertOne(data,(err,collection)=>{
        // if(err){
        //     throw err;
        // }else{console.log("Order Placed Successfully")}
    }
    console.log(data)
    // )

    // return res.redirect("/shop")
})


// router.post("/",(req,res)=>{
//     let user = require("../routes/user.js").userInfo
//     let keys= Object.keys(req.body);
//     // console.log(keys[0])
//     // console.log(req.body[keys[0]][0])
//     var data = {userAccount:user};
//     var current = {}
//     for (i=0;i<req.body[keys[0]].length;i++){
//         current = {}
//         for(j=0;j<keys.length;j++){
//             current[keys[j]]=req.body[keys[j]][i]
//         }
//         data[`person${i}`]=current

//     } console.log("Data array ready"+'\n'+JSON.stringify(data));
//     db.collection("orders").insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }else{console.log("Order Placed Successfully")}
//     })

//     return res.redirect("/shop")
// })

module.exports = router