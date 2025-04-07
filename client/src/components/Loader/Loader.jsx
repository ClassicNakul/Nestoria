import "./Loader.css";
import React from "react";
import { motion } from "framer-motion";
import { Building2, Home, Loader2 } from "lucide-react";

export default function RealEstateLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen loader-background text-gray-700">
      <motion.div className="relative mb-6 scale-110">
        <div className="flex items-center gap-4 text-indigo-600 loader-icon">
          <Home size={40} />
          <Loader2 size={40} className="animate-spin" />
          <Building2 size={40} />
        </div>
      </motion.div>

      <h1 className="text-2xl font-semibold tracking-wide loader-text">
        Finding your perfect property...
      </h1>
    </div>
  );
}
