import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-400",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
      rounded-3xl
      border
      border-slate-700/50
      bg-slate-900/70
      backdrop-blur-xl
      p-6
      shadow-xl
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2
            className={`mt-2 text-4xl font-bold ${color}`}
          >
            {value}
          </h2>

        </div>

        {Icon && (
          <div
            className="
            rounded-2xl
            bg-slate-800
            p-4
            "
          >
            <Icon
              className={color}
              size={30}
            />
          </div>
        )}

      </div>
    </motion.div>
  );
}

export default StatCard;