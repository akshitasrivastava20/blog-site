const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        required:true, 
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:"/images/default.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    },

},{timestamps:true});

userSchema.pre("save",function(next){
    const user=this;

    if(!user.isModified("password")) return;
    
})

const User=model('user',userSchema);
module.exports=User