import { useState, useEffect } from "react";
import { CheckSquare, Moon, Sun, Sparkles, Inbox } from "lucide-react";
import TaskInput from "./components/TaskInput";
import TaskFilter from "./components/TaskFilter";
import TaskItem from "./components/TaskItem";
import TaskStats from "./components/TaskStats";
import { useDarkMode } from "./hooks/useDarkMode";

function TaskManager() {
  const { isDark, toggleDarkMode } = useDarkMode();

  // --- Original State (Preserved exactly as provided) ---
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [editError, setEditError] = useState("");

  // --- Original Effects (Preserved exactly) ---
  useEffect(() => {
    console.log("The component has rendered");
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // --- Original Computed Values (Preserved exactly) ---
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "active" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  // --- Original Functions (Preserved exactly) ---
  function AddTask() {
    if (taskInput.trim() === "") {
      setError("Please enter a task.");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
    setError("");
  }

  function deleteTask(taskToDelete) {
    setTasks(tasks.filter((task) => task.id !== taskToDelete));
  }

  function toggleTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function saveTask(taskId) {
    if (editInput.trim() === "") {
      setEditError("Task cannot be empty.");
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editInput.trim() } : task
      )
    );
    setEditingTaskId(null);
    setEditError("");
  }

  function clearAll() {
    setTasks([]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header Section */}
        <header className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <CheckSquare className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Task Manager
                </h1>

              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Organize your goals, prioritize your day, and get things done.
              </p>
            </div>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all shadow-xs cursor-pointer"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Main Card Container */}
        <main className="space-y-6">
          {/* Card: Add Task Input */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 sm:p-6 shadow-sm backdrop-blur-xs">
            <TaskInput
              taskInput={taskInput}
              setTaskInput={setTaskInput}
              error={error}
              AddTask={AddTask}
            />
          </div>

          {/* Card: Stats Overview */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 sm:p-6 shadow-sm backdrop-blur-xs">
            <TaskStats
              total={tasks.length}
              completed={completedTasks.length}
              pending={pendingTasks.length}
            />
          </div>

          {/* Card: Search & Filters */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 sm:p-5 shadow-sm backdrop-blur-xs">
            <TaskFilter
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              filter={filter}
              setFilter={setFilter}
              clearAll={clearAll}
              hasTasks={tasks.length > 0}
            />
          </div>

          {/* Task List Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                Tasks ({filteredTasks.length})
              </h2>
              {searchInput && (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Filtered by &ldquo;{searchInput}&rdquo;
                </span>
              )}
            </div>

            {filteredTasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  No tasks found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  {tasks.length === 0
                    ? "Your list is currently empty. Add your first task above to get started!"
                    : "No tasks matched your current search or filter criteria."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    editingTaskId={editingTaskId}
                    editInput={editInput}
                    setEditInput={setEditInput}
                    editError={editError}
                    setEditError={setEditError}
                    setEditingTaskId={setEditingTaskId}
                    toggleTask={toggleTask}
                    saveTask={saveTask}
                    deleteTask={deleteTask}
                  />
                ))}
              </div>
            )}
          </section>
        </main>


      </div>
    </div>
  );
}

export default TaskManager;
