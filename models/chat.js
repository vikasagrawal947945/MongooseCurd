const mongoose = require("mongoose");

 const chatschema = new mongoose.Schema({
     from :{
        type : String,
        required : true,
     },
     to : {
        type : String , 
        required : true,
     },
     message : {
        type : String,
        maxLength: 500,
     },
     date :{
         type : Date,
         required : true,
     }
});

const chat = mongoose.model("chat" , chatschema);   //name of collection
 module.exports= chat;