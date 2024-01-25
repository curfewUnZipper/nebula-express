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
ORDER = mongoose.model("orders", orderSchema)
//-------------------------------------------------------------------------------------------------------------------





//variables for usage
let orderProduct=0;
let qty_field = 0;
let users =  {prsnt:1,user:{email:"fake@fake.com",name:"fake",role:"admin"}}
// console.log("current user", users.user)









router.get("/",(req,res) =>{
    // let users = require("../routes/user.js").userInfo
    // console.log("from get/: ", users.user)
    if (users.user==null){
        res.redirect("/user/login")
        console.log("Sign-in/Register")    
    }else{
        console.log("----Bypased Login for Testing in order.js at get(\"lh:3000/order\")-----")

        if(users.user.role=="admin"){
            res.render('order/adminFields1',{orderProduct:orderProduct, user:users.user})
        }else if(users.user.role=="user"){
            res.render('order/userFields1',{orderProduct:orderProduct, user:users.user})

        }  else{
            res.send("You are not allowed to order with Team Member Role.")
        }
    }
})
    









//--------------------------------------------------------POST---------------------------------------------------
router.post("/orderPreference", (req,res)=>{
    orderProduct = req.body.color.split(',',3)
    // console.log("ORDER:",orderProduct)
    res.redirect("/order")
})





//Stage 2
router.post("/fillFields",(req,res)=>{
    // let users = require("../routes/user.js").userInfo
    // console.log(users.user.role)
    req.body.field = req.body.field.filter(function (element){ //to remove empty fields from response
        return element != ''
    })
    qty_field=req.body;
        // console.log("in custom fields post",req.body)
    if (users.user.role == "admin"){
        res.render("order/adminFields2", {product:orderProduct, user:users.user, instruct:req.body})
    }
    else if (users.user.role =="user"){
        res.render("order/userFields2", {product:orderProduct, user:users.user, instruct:req.body})
        
    }
  
})




// -----------------------------------------------------------------------------------------
//-----------------------------------Placing Order Algorithm--------------------------------
// -----------------------------------------------------------------------------------------



router.post("/order-admin",async (req,res)=>{
    console.log("BEFORE ORDER\n\n\norder",orderProduct)
    // let users = require("../routes/user.js").userInfo
    
    let keys= Object.keys(req.body);
    console.log("\n\nIN THE ORDER:\n\n\nORDER:",req.body)
    console.log("DISPLAY CONSTRAINTS:",keys)
    console.log("Order qty:",req.body[keys[0]].length) //no. of tshirts
    //create order object
    let data = {}
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




    var userOrders = await ORDER.findOne({user:users.user.email})
    if (userOrders==null){
        var firstData = {user:users.user.email, orders:{}};
        //insert to db - old code 
        // db.collection("orders").insertOne(data,(err,collection)=>{
            // if(err){
            //     throw err;
            // }else{console.log("Order Placed Successfully")}
            // )
    }else{
        //findOneAndUpdate
    }

    }
    console.log(data)
    res.sendStatus(204)

    // return res.redirect("/shop")
})



module.exports = router