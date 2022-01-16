const express = require("express");
const bodyparser = require("body-parser");
const ejs = require('ejs');

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.get("/",function(req,res){
    res.render("index");
})

app.post("/",function(req,res){
    let paragraph = req.body.para;
    console.log(paragraph);
})

app.listen(3000,function(){
    console.log("server is runnig at port 3000")
})