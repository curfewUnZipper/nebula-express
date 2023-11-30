const express = require('express')
const app= express()

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



app.listen(3000)
console.log("Server is live @3000")