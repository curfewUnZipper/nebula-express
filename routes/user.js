//using router
const express = require('express')
const router = express.Router()


router.get("/",(req,res) =>{
    res.send(`Visit these links: <a href='/user/login'>Login</a><br>&emsp;&emsp;&emsp;&emsp;
    &emsp;&emsp;&nbsp;     <a href='/user/signup'>Signup</a>`)
   })

router.get("/login",(req,res) =>{
    res.render('user/login')
   })


router.get("/signup",(req,res) =>{
    res.render('user/signup')
   })
   
module.exports = router