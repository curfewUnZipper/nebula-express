const express = require('express')
const app= express()
require("dotenv").config()

app.set('view engine','ejs') //anpother engine: pug
app.use(express.urlencoded({extended:true})) //middleware to excess form values
app.use(express.static("public")) //use: /index.html in URL
app.use(express.json()) //allows us to touch json from body

// app.get("/order",(req,res) => {
//     res.render('order',{text:"world"})
// })
app.get("",(req,res)=>{
    res.redirect("/home")
})


//My Routers

const home = require("./routes/home")
app.use('/home', home)

const shop = require("./routes/shop")
app.use('/shop', shop)

const user = require("./routes/user")
app.use('/user', user)

const order = require("./routes/order")
app.use('/order', order)

const about = require("./routes/about")
app.use('/about', about)

const contact = require("./routes/contact")
app.use('/contact', contact)

//serverPrsnt()
function prsntFetch(){
    let pres = require("./routes/user").pres 
    console.log("From fetching function:"+ pres)
    return pres
}

async function serverPrsnt(){
    console.log("finding value:"+ prsntFetch())
    setInterval(async=>{console.log("from server "+prsntFetch())},1000)
}

app.listen(process.env.PORT,()=>{
    console.log("Server is live @3000")
})
