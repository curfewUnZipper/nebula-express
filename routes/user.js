//using router
const express = require('express')
const router = express.Router()
const mongoose = require("mongoose") 
    
//database connection
mongoose.connect("mongodb://localhost:27017/orderDetails")
var db= mongoose.connection;
db.on('error',()=>{console.log("Error in Connecting to Database")})
db.once('open',()=>{console.log("Connected to Database in USERS")})
const userSchema = new mongoose.Schema({userName: String,
                                        password: String,
                                        email: String})
USER = mongoose.model("User", userSchema)


router.get("/",(req,res) =>{
    // res.send(`Visit these links: <a href='/user/login'>Login</a><br>&emsp;&emsp;&emsp;&emsp;
    // &emsp;&emsp;&nbsp;     <a href='/user/signup'>Signup</a>`)
    res.redirect("/user/login")
   })


router.get("/login",(req,res) =>{
    res.render('user/login')    
    
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
    if (req.body.username!='' &&
        req.body.password!=''){
    flagChange()
    async function flagChange(){
    flagLogin = await loginUser(req.body.username,req.body.password)
    if (flagLogin==true){res.redirect("/")}
    else{console.log("Invalid userID or Password")
    res.redirect("/user/login")}
  } 
}   
    
})

//signup
router.post("/signup",(req,res)=>{
    //console.log(req.body);
    if (req.body.username!='' && 
        req.body.password!='' &&
        req.body.email!=''){
        insertUser(req.body.username,req.body.password,req.body.email)    
}
    return res.redirect("/")
})


//login function
async function loginUser(username, passwd){
try{
    var userOn = await USER.findOne({userName:username,password:passwd})
    if (userOn == null){
        console.log("DB said: No such user")
        return false
    }else{
    console.log("How have you been "+userOn.userName)
    }
}catch(e){console.log(e.message)}
return true
}

//signup function
async function insertUser(username,passwd,mail){
    var data= new USER({userName : username,
                        password : passwd,
                        email : mail
                      })
    try{await data.save()
    console.log("Welcome to Nebula "+data.userName)
    }catch(e){console.log(e.message)}
}



module.exports = router