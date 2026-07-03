function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">
      <h2 className="text-2xl font-bold text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">
        <button className="text-2xl">🔔</button>

        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            H
          </div>

          <div>
            <p className="text-white font-semibold">
              Harish
            </p>

            <p className="text-slate-400 text-sm">
              Student
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;