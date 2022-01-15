const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    let paragraph = req.body.para;
    console.log(paragraph);
})

app.listen(3000,function(){
    console.log("server is runnig at port 3000")
})