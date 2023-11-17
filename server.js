const express = require('express')
const app= express()
const mongoose = require("mongoose") 

app.set('view engine','ejs') //anpother engine: pug
app.use(express.urlencoded({extended:true})) //middleware to excess form values
app.use(express.static("public")) //use: /index.html in URL
app.use(express.json()) //allows us to touch json from body

app.get("/order",(req,res) => {
    res.render('order',{text:"world"})
})

//My Routers

const home = require("./routes/home")
app.use('/home', home)

const shop = require("./routes/shop")
app.use('/shop', shop)

const login = require("./routes/login")
app.use('/login', login)


//database connection
mongoose.connect("mongodb://localhost:27017/orderDetails")
var db= mongoose.connection;
db.on('error',()=>{console.log("Error in Connecting to Database")})
db.once('open',()=>{console.log("Connected to Database")})

app.post("/order",(req,res)=>{
    //console.log(req.body);
    var data = [];
    for (i=0;i<req.body.name.length;i++){
        if (req.body.name[i]!='' && 
            req.body.post[i]!='' &&
            req.body.size[i]!=''){
        data.push({
                    "name":req.body.name[i],
                    "post":req.body.post[i],
                    "size":req.body.size[i]
                  })
        }else{continue;}
    } console.log("Data array ready"+'\n'+JSON.stringify(data));
    db.collection("orders").insertMany(data,(err,collection)=>{
        if(err){
            throw err;
        }console.log("Order Placed Successfully")
    })
    
    return res.redirect("orderSuccess.html")
})




app.listen(3000)
console.log("Server is live @3000")