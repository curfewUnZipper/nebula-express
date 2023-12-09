//using router
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose") 
require("dotenv").config()
let prsnt = null //the thing
//database connection
mongoose.connect(process.env.atlas1+process.env.atlas2+process.env.atlas3+process.env.atlas4)
var db= mongoose.connection;
db.on('error',()=>{console.log("Error in Connecting to Database")})
db.once('open',()=>{console.log("Connected to Database in USERS")})
const userSchema = new mongoose.Schema({Name: String,
                                        password: String,
                                        email: String})
USER = mongoose.model("User", userSchema)


router.get("/",(req,res) =>{
    res.redirect("/user/login")
   })

router.get("/out",(req,res)=>{
    prsnt = null;
    //module.exports.pres=prsnt;
    console.log("See you soon "+data.Name)
    data = null;
    res.redirect("/user/login")
})
router.get("/login",(req,res) =>{
    if (prsnt==null){
        res.render("user/login")
    }else{
    res.redirect('/user/dashboard')    
    }
    
})

router.get("/dashboard",(req,res) =>{
    res.render('user/dashboard')    
})


router.get("/signup",(req,res) =>{
    res.render('user/signup')
   })
   

router.get("/admin",(req,res) =>{
    res.send('PAGE FOR ADMIN REGISTERATION')
   })
   

//login
router.post("/login",(req,res)=>{
    var flagLogin = false;
    if (req.body.email!='' &&
        req.body.password!=''){
    flagChangeLog()
    async function flagChangeLog(){
    flagLogin = await loginUser(req.body.email,req.body.password)
    if (flagLogin==true){prsnt=0;
        //module.exports.pres = prsnt;
        res.redirect("/user/dashboard")}
    else{console.log("Invalid email or Password")}
  } 
}   
    
})

//signup
router.post("/signup",(req,res)=>{
    //console.log(req.body);
    var flagSingup = false;
    flagChangeSign()
    async function flagChangeSign(){
    if (req.body.name!='' && 
        req.body.password!='' &&
        req.body.email!=''){
        flagChangeSign = await insertUser(req.body.name,req.body.password,req.body.email)    
        if (flagChangeSign==true){prsnt=null;
            //module.exports.pres = prsnt;
            return res.redirect("/user/login")
        }else{console.log("Email-id already in use, Try Signing In")}
    }
}
})

                //------------------FUNCTIONS------------------------- 
//login function
async function loginUser(mail, passwd){
try{
    var userOn = await USER.findOne({email:mail,password:passwd})
    if (userOn == null){
        console.log("DB said: No such user")
        return false
    }else{
    console.log("How have you been "+userOn.Name)
    }
}catch(e){console.log(e.message)}
return true
}

//signup function
async function insertUser(name,passwd,mail){
    var data= new USER({Name : name,
                        password : passwd,
                        email : mail
                      })
    try{
        var already = await USER.findOne({email:mail})
        if (already == null){
            await data.save()
        console.log("Welcome to Nebula "+data.Name)
        }else{return false}
    }catch(e){console.log(e.message)}
    return true
}

//printAuth()
async function printAuth(){
    setInterval(async=>{
        console.log(prsnt)
        module.exports.pres = prsnt
    },1000)
}
module.exports = router
