function StatCard({
  title,
  value,
  color,
  icon: Icon,
  subtitle,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-blue-900/30">

      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20"></div>

      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">

        {Icon && <Icon size={28} />}

      </div>

      {/* Title */}

      <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
        {title}
      </p>

      {/* Value */}

      <h2 className={`mt-3 text-5xl font-extrabold ${color}`}>
        {value}
      </h2>

      {/* Subtitle */}

      <p className="mt-3 text-sm text-slate-500">
        {subtitle || "Updated just now"}
      </p>

      {/* Bottom Progress Bar */}

      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-800">

        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>

      </div>

    </div>
  );
}

export default StatCard;