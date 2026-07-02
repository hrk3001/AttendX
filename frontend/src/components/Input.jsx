function Input({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-500"
    />
  );
}

export default Input;