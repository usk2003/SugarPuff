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
import React, { useState } from "react";
import Image from "next/image";
import googlelogo from "../../../public/images/googlelogo.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
type propType = {
  previousStep: (s: number) => void;
};

function RegisterForm({ previousStep }: propType) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      router.push("/login")
      setLoading(false);
    } catch (error) {
      console.log("Registration error:", error);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 relative">
      <div
        className="
        absolute
        top-6
        left-6
        flex
        items-center
        gap-2
        text-rose-700
        hover:text-gray-900
        transition-colors
        cursor-pointer
        "
        onClick={() => previousStep(1)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-md">Back</span>
      </div>
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
        Create Your Account
      </motion.h2>
      <motion.p
        className="
        text-lg
        mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Join us today
        <LeafIcon className="inline-block w-4 h-4 ml-1 text-rose-400" />
      </motion.p>
      <motion.form
        onSubmit={handleRegister}
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
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-300" />
          <input
            type="text"
            placeholder="Your Name"
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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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
          const formValidation = name !== "" && email != "" && password !== "";
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
                "Register"
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


      <p className="mt-6 text-gray-600 text-sm flex items-center gap-2" onClick={()=> router.push("/login")}>
        Already have an account? <LogIn className="w-4 h-4 text-gray-400" />{" "}
        <span className="text-rose-500 cursor-pointer text-bold"> Sign in</span>
      </p>
    </div>
  );
}

export default RegisterForm;
