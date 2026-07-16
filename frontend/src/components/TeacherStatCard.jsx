function TeacherStatCard({ title, value, color }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
      <p className="text-slate-400">{title}</p>

      <h2 className={`mt-2 text-4xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default TeacherStatCard;