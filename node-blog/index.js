const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request=require("request");
const https=require("https");
const _ = require('lodash');
const mongoose = require('mongoose');
const { stubString } = require("lodash");

mongoose.connect("mongodb+srv://yash7652:ybig2121@cluster0.gnqwd.mongodb.net/BlogByYDB",{
  useNewUrlParser: true,
});


const app = express();

const postSchema = new mongoose.Schema({
  tittle: String,
  body: String
});

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

// app.use(express.urlencoded({
//   extended: false
// }));
app.use(express.json({extended: true}));

app.use(express.static("public"));


app.get("/", function(req, res) {

  Post.find(function(err, posts){
    if(err){
      console.log(err);
    }{
      // console.log(posts);
      res.render("index", {
        posts: posts
      });
    }
  });
});

app.get("/about",function(req,res){
    res.render("about") 
})

// signup page
app.get("/contact",function(req,res){
 
    res.render("contact");
});

app.post("/contact",function(req,res){
    var nm1=req.body.namefst;
    var nm2=req.body.namelst;
    var gm=req.body.gmail;
    var data={
        members:[
            {
                email_address: gm,
                status: "subscribed",
                merge_fields:{
                    FNAME: nm1,
                    LNAME: nm2

                }
            }
        ]
    };

    const jsondata =JSON.stringify(data);
    const url="https://us20.api.mailchimp.com/3.0/lists/8d8e408a5c";
    const options= {
        method: "POST",
        auth: "yash:10f3dc4fa86269b4044866e305df7c11-us20"
    }

   const request= https.request(url,options,function(rs)
    {
        if(rs.statusCode==200)
        {
            res.render("success");
        }
        else
        {
            res.render("fail");
        }
        rs.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});
app.post("/fail",function(req,res){
    res.redirect("/contact");
})


app.get("/addp", function(req, res) {
  res.render("addp");
});

app.post("/addp", function(req, res) {

    const post = new Post({
      tittle: req.body.tittle,
      body: req.body.content
    });
  
    post.save(function(err){
      if(!err){
        res.redirect("/");
      }
    });
  });

app.get("/posts/:posttittle", function(req, res) {
  const reqtittle = req.params.posttittle;

  Post.findOne({_id: reqtittle}, function(err, post){
      res.render("post", {
        tittle : post.tittle ,
        content : post.body
      });
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server has started scuccessfully");
});