//using router
const express = require('express')
const router = express.Router()
const fileNames = require("../views/fileNames.js")

router.get("/",(req,res) =>{
    let typeReq = req.query.type || 'tshirts' //getting data from a URL

   //localhost:3000/users?name=gigi   now logs   gigi
    let types = ['tshirts', 'oversizedts','hoodies']
    let productList=fileNames(types.indexOf(typeReq)) //ran fileName js
    res.render('shop/shop', {type:typeReq, products:productList})
   })

   router.get("/details",(req,res) =>{
    res.render('shop/popup')
   })
   
module.exports = router