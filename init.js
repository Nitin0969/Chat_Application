const mongoose = require("mongoose");
const chat = require("./models/chats");

main()
.then(()=>{
    console.log("connection succesfull");
})
.catch((err)=>console.log("err"));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chats");
}

let allchats =[
{
    from:"Ram",
    to:"Shyam",
    msg:"hello shyam",
    created_at:new Date()
},
{
    from:"Rohit",
    to:"mohit",
    msg:"hello mohit",
    created_at:new Date()
},
{
    from:"raman",
    to:"namam",
    msg:"hello namam",
    created_at:new Date()
},
{
    from:"vikas",
    to:"rikas",
    msg:"hello rikas",
    created_at:new Date()
}
];

chat.insertMany(allchats);
console.log(allchats);