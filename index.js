const express=require('express');
const path=require('path');
const app=express();
const PORT=8000
const mongoose=require("mongoose");
const cookieParser=require('cookie-parser');
mongoose.connect("mongodb://127.0.0.1:27017/blogify").then((e)=> console.log("mongodb connected"));
const userRouter=require("./routes/user");
const blogRouter=require("./routes/blog")
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const Blog=require('./models/blog')


app.set('view engine',"ejs");
app.set("views",path.resolve("./views"));
app.use(express.static(path.resolve("./public")));

app.use(express.urlencoded({extended:true})
);
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.get('/',async(req,res)=>{
    const allBlogs=await Blog.find({});

    return res.render("homepage",{
        user:req.user,
        blogs:allBlogs,
    });
})
 app.use("/user",userRouter);
 app.use('/blog',blogRouter);
 

app.listen(PORT,()=>{
    console.log("servver started");
})