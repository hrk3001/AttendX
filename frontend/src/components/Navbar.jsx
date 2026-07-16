function Navbar() {

  const isTeacher =
    localStorage.getItem("teacherLoggedIn") === "true";

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  const teacher = JSON.parse(
    localStorage.getItem("teacher") || "{}"
  );

  const user = isTeacher ? teacher : admin;

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">

      <h2 className="text-2xl font-bold text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <button className="text-2xl">
          🔔
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <div>

            <p className="font-semibold text-white">
              {user?.name}
            </p>

            <p className="text-sm text-slate-400">
              {isTeacher ? "Teacher" : "Administrator"}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;