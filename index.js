const express=require('express');
const path=require('path');
const app=express();
const PORT=8000
const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then((e)=> console.log("mongodb connected"));
const userRouter=require("./routes/user")

app.set('view engine',"ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:true})
);
app.use(express.json());

app.get('/',(req,res)=>{
    return res.render("homepage");
})
 app.use("/user",userRouter);

app.listen(PORT,()=>{
    console.log("servver started");
})