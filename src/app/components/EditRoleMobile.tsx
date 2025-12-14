'use client'
import React, { useState } from 'react'
import { motion } from "motion/react";
import { Bike, User, UserCog } from 'lucide-react';
function EditRoleMobile() {

    const [roles,setRoles]=useState([
        {id:"admin",label:"Admin",icon:UserCog},
        {id:"user",label:"User",icon:User},
        {id:"deliveryBoy",label:"Delivery Agent",icon:Bike}
    ])
    const [selectedRole,setSelectedRole]=useState("")
  return (
    <div className='flex flex-col min-h-screen p-6 w-full bg-whitebg-linear-to-b from-red-200 to-white"'>
        <motion.h2
        className="
        text-3xl
        md:text-4xl
        font-bold
        text-rose-400
        mt-8
        text-center
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Select Your Role
      </motion.h2>
      <div className='flex flex-col md:flex-row justify-center items-center gap-6 mt-10'>
        {
            roles.map((role)=>{
                const Icon=role.icon
                const isSelected = selectedRole==role.id
                return (
                    <motion.div className={`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2 transition-all${
                    isSelected?"border-rose-500 bg-rose-200 shadow-lg":
                    "border-gray-300 bg-white hover:border-rose-300"
                }`}>
                       <Icon/>
                       <span>
                        {role.label}
                        </span> 
                    </motion.div>
                )
            })
        }

      </div>
    </div>
  )
}

export default EditRoleMobile