import React from "react";
import { motion } from "framer-motion";

const colorClasses = {
  blue: "from-blue-500 to-blue-600 hover:shadow-blue-300",
  orange: "from-orange-500 to-orange-600 hover:shadow-orange-300",
  purple: "from-purple-500 to-purple-600 hover:shadow-purple-300",
  teal: "from-teal-500 to-teal-600 hover:shadow-teal-300",
  rose: "from-rose-500 to-rose-600 hover:shadow-rose-300",
  indigo: "from-indigo-500 to-indigo-600 hover:shadow-indigo-300",
  green: "from-green-500 to-green-600 hover:shadow-green-300",
  cyan: "from-cyan-500 to-cyan-600 hover:shadow-cyan-300",
  amber: "from-amber-500 to-amber-600 hover:shadow-amber-300",
};

const ActionButton = ({ label, Icon, onClick, title, color = "green" }) => {
  const buttonColor = colorClasses[color] || colorClasses.green;

  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg text-white font-semibold w-full h-32 bg-gradient-to-br transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${buttonColor}`}
      title={title || label}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-9 w-9 mb-2" />
      <span className="text-sm text-center leading-tight">{label}</span>
    </motion.button>
  );
};

export default ActionButton;

