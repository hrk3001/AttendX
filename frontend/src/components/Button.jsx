import { motion } from "framer-motion";
function Button({ children, onClick, type = "button" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{scale: 1.03,}}
      whileTap={{scale: 0.97,}}
      className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500 active:scale-95"
    >
      {children}
    </motion.button>
  );
}

export default Button;