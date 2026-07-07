function Input({
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    />
  );
}

export default Input;