'use client'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LeafIcon,
  Loader2,
  Lock,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import Email from "next-auth/providers/email";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import googlelogo from "../../../public/images/googlelogo.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const router = useRouter();
const session = useSession();
console.log(session)
const handleLogin=async(e:FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    try{
        await signIn("credentials",{
            email,password
        })
        router.push("/")
        setLoading(false)
    }catch(error){
        console.log(error)
        setLoading(false)
    }

}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 relative">
      <motion.h2
        className="
        text-4xl
        font-bold
        text-rose-400
        mb-2
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Welcome Back!
      </motion.h2>
      <motion.p
        className="
        text-lg
        mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Login to SugarPuff
        <LeafIcon className="inline-block w-4 h-4 ml-1 text-rose-400" />
      </motion.p>
      <motion.form
        onSubmit={handleLogin}
        className="
        flex
        flex-col
        gap-5
        w-full
        max-w-sm
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative mt-2">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-300" />
          <input
            type="text"
            placeholder="Your Email"
            className="
            w-full 
            border
            border-rose-300
            rounded-xl
            py-3
            pl-10
            px-10
            focus:outline-none
            focus:ring-2
            focus:ring-rose-400
            text-gray-700
            placeholder-rose-300
            "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="relative mt-2">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-300" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            className="
            w-full 
            border
            border-rose-300
            rounded-xl
            py-3
            pl-10
            px-10
            focus:outline-none
            focus:ring-2
            focus:ring-rose-400
            text-gray-700
            placeholder-rose-300
            "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-3 w-5 h-5 text-rose-300 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              className="absolute right-3 top-3 w-5 h-5 text-rose-300 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {(() => {
          const formValidation = email != "" && password !== "";
          return (
            <button
              disabled={!formValidation || loading}
              className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex justify-center items-center gap-2 ${
                formValidation
                  ? "bg-rose-400 hover:bg-rose-500 text-white shadow-rose-300/50 hover:shadow-rose-400/40"
                  : "bg-rose-200 text-rose-100 cursor-not-allowed shadow-none"
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          );
        })()}

        <div className="flex item-center gap-2 text-gray-400 text-sm mt-2">
          <span className=" flex-1 h-px bg-gray-300"></span>
          OR
          <span className=" flex-1 h-px bg-gray-300"></span>
        </div>
      <div className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200"
        onClick={()=>signIn("google",{callbackUrl:"/"})}
        >
          <Image
            src={googlelogo}
            alt="Google Logo"
            width={20}
            height={20}
            className="inline-block mr-2 mb--2"
          />
          Continue with Google
        </div>
      </motion.form>


      <p className="mt-6 text-gray-600 text-sm flex items-center gap-2" onClick={()=>router.push("/register")}>
       Want to create an account? <LogIn className="w-4 h-4 text-gray-400" />{" "}
        <span className="text-rose-500 cursor-pointer text-bold"> Sign Up</span>
      </p>
    </div>
  );
}

export default Login;
