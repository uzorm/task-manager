import { CheckCircle2, Clock, ListTodo } from "lucide-react";

export default function TaskStats({ total, completed, pending }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 transition">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
            <ListTodo className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {total}
          </p>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/40 transition">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Done</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="mt-1 text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-300">
            {completed}
          </p>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40 transition">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="mt-1 text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-300">
            {pending}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {total > 0 && (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-slate-600 dark:text-slate-300">Overall Progress</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{percentage}% completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
