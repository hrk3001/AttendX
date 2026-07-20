import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  color,
  icon: Icon,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{ duration: 0.2 }}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-700/50
      bg-slate-900/80
      p-6
      shadow-xl
      backdrop-blur-xl
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${color}`}>
            {value}
          </h2>

        </div>

        {Icon && (
          <div className="rounded-2xl bg-slate-800 p-4">
            <Icon
              size={30}
              className={color}
            />
          </div>
        )}

      </div>
    </motion.div>
  );
}

export default StatCard;