import { Check, Edit3, Trash2, X, CheckCircle2 } from "lucide-react";

export default function TaskItem({
  task,
  editingTaskId,
  editInput,
  setEditInput,
  editError,
  setEditError,
  setEditingTaskId,
  toggleTask,
  saveTask,
  deleteTask,
}) {
  const isEditing = editingTaskId === task.id;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 p-4 sm:p-5 ${
        task.completed
          ? "bg-slate-50/80 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 opacity-90"
          : "bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/70 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Task content or Edit Form */}
        <div className="flex-1 min-w-0 flex items-start sm:items-center gap-3">
          {/* Quick toggle checkmark circle */}
          <button
            type="button"
            onClick={() => toggleTask(task.id)}
            title={task.completed ? "Mark as pending" : "Mark as completed"}
            className={`mt-0.5 sm:mt-0 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              task.completed
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-transparent text-transparent hover:text-slate-400"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          {isEditing ? (
            <div className="w-full">
              <input
                type="text"
                value={editInput}
                onChange={(e) => {
                  setEditInput(e.target.value);
                  setEditError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveTask(task.id);
                  if (e.key === "Escape") {
                    setEditingTaskId(null);
                    setEditInput("");
                    setEditError("");
                  }
                }}
                autoFocus
                placeholder="Edit task description..."
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-900 border border-indigo-400 dark:border-indigo-500 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              {editError && (
                <p className="text-rose-500 dark:text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <span>⚠</span> {editError}
                </p>
              )}
            </div>
          ) : (
            <div className="min-w-0">
              <p
                className={`text-sm sm:text-base font-medium break-words transition-all ${
                  task.completed
                    ? "line-through text-slate-400 dark:text-slate-500"
                    : "text-slate-800 dark:text-slate-100"
                }`}
              >
                {task.text}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                    task.completed
                      ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                      : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {new Date(task.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => saveTask(task.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingTaskId(null);
                  setEditInput("");
                  setEditError("");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
            </>
          ) : (
            <>
              {/* Toggle Complete button */}
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  task.completed
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                    : "bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {task.completed ? "Completed" : "Complete"}
              </button>

              {/* Edit button */}
              <button
                type="button"
                onClick={() => {
                  setEditingTaskId(task.id);
                  setEditInput(task.text);
                  setEditError("");
                }}
                title="Edit task"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>

              {/* Delete button */}
              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                title="Delete task"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
