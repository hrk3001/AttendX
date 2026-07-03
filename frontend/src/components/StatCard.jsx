function StatCard({ title, value, color }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h3 className="text-slate-400 text-sm">
        {title}
      </h3>

      <h2 className={`mt-3 text-4xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default StatCard;