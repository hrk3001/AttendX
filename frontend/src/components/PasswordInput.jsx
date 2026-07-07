import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="Password"
        className="w-full rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

export default PasswordInput;