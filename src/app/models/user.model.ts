import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

interface IUser{
    _id?:mongoose.Types.ObjectId;
    name:string;
    email:string;
    password?:string;
    mobile?:string;
    role: "user" | "admin" | "deliveryBoy"
    //google lo image untadi kada daniki
    image?:string
}
//painadi typescript and kindadi mongoose schema
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:false
},
mobile:{
    type:String,
    required:false
},
role:{
    type:String,
    enum:["user","admin","deliveryBoy"],
    default:"user"
},
image:{
    type:String

}


},{timestamps:true})

const User=mongoose.models.User || mongoose.model("User", userSchema);
export default User;