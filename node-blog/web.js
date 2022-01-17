const express = require("express");
const bodyparser = require("body-parser");
const ejs = require('ejs');
const request=require("request");
const https=require("https");
const _ = require('lodash');

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs')
app.use(express.static("public"))

const lt="this is yash"
//// post array
var post=[]
app.get("/",function(req,res){
    
    // res.render("index");
    res.render("index",{
            list:lt ,
        post: post
    })
   
})

/// post-paragraph
app.get("/addp",function(req,res){
    res.render("addp");
})
app.post("/addp",function(req,res){

    const obj={
        tit: req.body.tittle,
        para: req.body.content,
    }
   
    post.push(obj);
    res.redirect("/");
})

app.get("/post/:posttittle",function(req,res){
    const reqtittle= _.lowerCase(req.params.posttittle);

    post.forEach(page => {
        const looptittle = _.lowerCase(page.tit); 
        if(looptittle===reqtittle)
        {
           res.render("posts",{
              tittle: page.tit,
              content: page.para
           });


    }
       
    });
   
});
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

///////////////

app.listen(3000,function(){
    console.log("server is runnig at port 3000")
})

