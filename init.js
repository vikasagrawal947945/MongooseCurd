// databases related saara code connection ,chat file import , data sb  chiz

const mongoose = require("mongoose");
const chat = require("./models/chat");


main()
.then(()=>{ console.log("connection sucessfull")})
.catch((err)=>{console.log(err)});

async function main(){
await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
};

chat.insertMany([
    {
        from :"neha",
        to  : "priya",
        message : "hello how r u",
        date : new Date(),
    },
     {
        from :"vikas",
        to  : "vidhi",
        message : "send me your notes",
        date : new Date(),
    }, 
    {
        from :"neha",
        to  : "vidhi",
        message :  "hello .lets go",
        date : new Date(),
    },
]);