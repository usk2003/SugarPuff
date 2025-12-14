"use client";

import React from "react";
import { motion } from "motion/react";
import { ShoppingCart, Menu } from "lucide-react"; // You might need to install: npm install lucide-react
type propType={
    nextStep:(s:number)=>void
}
function Welcome({nextStep}:propType) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6">
      <div
        className="absolute inset-0 z-0"
        style={{
          // Use the image you generated or the gradient fallback
          backgroundImage: `url('/images/bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center mt-10 sm:mt-0">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            font-serif 
            text-5xl sm:text-5xl md:text-6xl lg:text-7xl 
            font-black 
            text-[#3E2723] 
            tracking-tight 
            leading-[1.1]
            drop-shadow-sm
          "
        >
          SugarPuff
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="
            mt-6 
            text-lg sm:text-xl md:text-2xl 
            text-[#5D4037] 
            max-w-xl
            font-medium
            opacity-90
            leading-relaxed
          "
        >
          Thoughtfully crafted treats, gentle flavors, and moments made to be
          savored.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <button
            className="
              group
              relative
              bg-[#FFB3C1] 
              hover:bg-[#ff9aae] 
              text-[#3E2723] 
              font-extrabold 
              text-lg md:text-xl
              py-4 px-10 md:py-5 md:px-14
              rounded-full 
              shadow-[0_4px_14px_0_rgba(255,179,193,0.5)]
              hover:shadow-[0_6px_20px_rgba(255,179,193,0.4)]
              hover:-translate-y-1
              transition-all 
              duration-300
              ease-in-out
            "
            onClick={() => nextStep(2)}
          >
            Explore Sweets
            {/* Shine effect overlay */}
            <div className="absolute inset-0 rounded-full ring-2 ring-white/40 group-hover:ring-white/60 transition-all"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Welcome;
