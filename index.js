const express = require("express");
const { copyFileSync } = require("fs");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// Require model
const chat = require("./models/chats");
const methodoverirde = require("method-override");
app.use(methodoverirde("_method"));

// Set view directory and view engine
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

// css

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
main()
.then(()=>{
    console.log("connection succesfull");
})
.catch((err)=>console.log("err"));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chats");
}

// let chat1 = new chat({
//     from:"Riya",
//     to:"ram",
//     msg:"hello",
//     created_at:new Date()
// });


// chat1.save().then((res)=>{
//     console.log(res);
// }).then((err)=>{
//     console.log(err);
// })

// routes
// index route - /chats
app.get("/chats",async (req,res)=>{
   let Chats =  await chat.find();

   res.render("index.ejs",{Chats});

})

app.get("/",(req,res)=>{
    res.send("working");
})
// ṇew route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
// create route
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new chat({
        from : from,
        to :to,
        msg : msg,
        created_at:new Date() 
    })

    newChat.save().then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
});

app.get("/chats/:id/Edit", async(req,res)=>{
    let { id } = req.params;
    let chats = await chat.findById(id);
    res.render("Edit.ejs",{chats});
})

app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params; 
    let {msg:newmsg} = req.body;
    console.log(newmsg);
    
    let updatedchat = await chat.findByIdAndUpdate(id,{msg:newmsg},
        {runValidators:true,new:true});
    console.log(updatedchat);
    res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params; 
    let chattodelete = await chat.findByIdAndDelete(id);
    console.log(chattodelete);
    res.redirect("/chats");
})
app.listen(8081,()=>{
    console.log("server is listening on pot 8080");
})