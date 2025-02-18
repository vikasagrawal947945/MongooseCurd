const express = require("express");
 const app = express();
 app.use( express.urlencoded({extended : true}));
 const mongoose = require("mongoose");
 const path = require("path");
app.set("view engine" , "ejs");
 app.set("views" , path.join(__dirname ,"views"));
 app.use(express.static(path.join(__dirname , "public")));
  const methodOverride = require("method-override");
  app.use(methodOverride('_method'));
 const ExpressError = require("./ExpressError");
  let chat = require("./models/chat");    //requring chat collection from  index.js


  main()
  .then(()=>{ console.log("connection sucessfull")})
  .catch((err)=>{console.log(err)});
 
  async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
 };

  let chat1 =  new chat({
     from : "vikas", 
     to  :  "vidhi",
    message : "hii bro", 
    date :  new Date()
  });
   chat1.save();

app.get("/chats" , async(req,res) =>{
   let chats =  await chat.find();
  // console.log(chats);
   res.render("index.ejs" ,{chats});
});
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})

app.post("/chats", (req,res) => {
   let {from , to , message} = req.body;
   let newChat =  new chat({
     from : from,
     to  : to, 
     message : message ,
     date : new Date()
   }).save().then((res)=>{
      console.log(res);
   }).catch((err)=>{console.log(err)});
   res.redirect("/chats")
});

// edit route
app.get("/chats/:id/edit",  async (req,res) => {
    let {id} = req.params;  // finding chat on this id bases
     let Chat = await chat.findById(id);  //finding chat based on  id and store it  in a Chat variable..
    res.render("edit.ejs", {Chat});
});
 // show route
 app.get("/chats/:id" ,async(req,res)=>{
    let {id} = req.params;
    let Chat = await chat.findById(id);
    if(!Chat) {
         throw new ExpressError(404, "Page not foud");
         }
     res.render("edit.ejs" , {Chat});
 });


app.put("/chats/:id" , async(req,res)=>{
    let {id} = req.params;
    let {newmsg} = req.body;
    let updatedChat =  await chat.findByIdAndUpdate(id , ({message : newmsg}));
    console.log(updatedChat);
    res.redirect("/chats")  // get request ki chat wali route pe chala jayega
});
 app.delete("/chats/:id" , (req,res)=>{
     let {id} = req.params;
    console.log(id);
    chat.findByIdAndDelete(id).then((res) =>{
        console.log(res)  })
        .catch((err) =>{
           console.log(err);
        });
 res.redirect("/chats");    
 });

 app.get("/" ,(req,res)=>{
  res.send("connection successfull");
 });

//Error handling Middleware
 app.use((err,req,res,next)=>{
     let{ status ,message} = err;
     res.status(status).send(messaage); });
 
 
 app.listen( 3000, ()=>{
    console.log("Server is running on 3000");
 });