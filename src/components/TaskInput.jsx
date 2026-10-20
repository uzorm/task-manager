import { Plus } from "lucide-react";

export default function TaskInput({
  taskInput,
  setTaskInput,
  error,
  AddTask,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      AddTask();
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition shadow-xs text-sm sm:text-base"
          />
        </div>
        <button
          type="button"
          onClick={AddTask}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-indigo-500/25 transition-all duration-200 flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Add Task</span>
        </button>
      </div>

      {error && (
        <p className="text-rose-500 dark:text-rose-400 text-xs sm:text-sm font-medium flex items-center gap-1.5 pl-1 animate-fadeIn">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
