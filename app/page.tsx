"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useTasks } from "./hooks/useTasks";
import { Task, TaskCategory, TaskPriority } from "./lib/types";
import { motion } from "framer-motion";
import { FilterDropdown } from "./components/FilterDropdown";
import { SearchBar } from "./components/SearchBar";
import {
  SortDropdown,
  SortOption,
  SortDirection,
} from "./components/SortDropdown";
import { sortTasks } from "./lib/sortUtils";
import TaskList from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import Stats from "./components/Stats";

export default function Home() {
  const { tasks, loading, createTask, updateTask, deleteTask, reorderTasks } =
    useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeCategory, setActiveCategory] = useState<TaskCategory | "all">(
    "all",
  );
  const [activePriority, setActivePriority] = useState<TaskPriority | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("manual");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const categoryMatch =
        activeCategory === "all" || task.category === activeCategory;
      const priorityMatch =
        activePriority === "all" || task.priority === activePriority;

      const searchMatch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return categoryMatch && priorityMatch && searchMatch;
    });

    return sortTasks(filtered, sortBy, sortDirection);
  }, [
    tasks,
    activeCategory,
    activePriority,
    searchQuery,
    sortBy,
    sortDirection,
  ]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleDeleteClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setTaskToDelete(task);
      setDeleteConfirmOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    setDeleting(true);
    try {
      await deleteTask(taskToDelete.id);
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setTaskToDelete(null);
  };

  const handleSortChange = (
    newSortBy: SortOption,
    newDirection: SortDirection,
  ) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  const handleReorder = (reorderedTasks: Task[]) => {
    if (sortBy === "manual") {
      reorderTasks(reorderedTasks);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
        </motion.div>
      </main>
    );
  }

  // Stats calculations
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = tasks.filter((t) => !t.completed).length;
  const overdueTasks = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date(),
  ).length;

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="shrink-0 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Track and manage your tasks with real-time updates
          </p>
        </div>

        {/* Stats */}
        <Stats
          tasks={tasks}
          activeTasks={activeTasks}
          overdueTasks={overdueTasks}
          completedTasks={completedTasks}
        />

        {/* Controls Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Search, Filter, and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* SearchBar - Grows to fill space on mobile/tablet */}
            <div className="w-full sm:w-64 md:w-80">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Dropdowns Container - Side-by-side on even the smallest screens */}
            <div className="flex gap-2 sm:gap-3">
              <div className="">
                <FilterDropdown
                  activeCategory={activeCategory}
                  activePriority={activePriority}
                  onCategoryChange={setActiveCategory}
                  onPriorityChange={setActivePriority}
                />
              </div>
              <div className="">
                <SortDropdown
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>
          </div>

          {/* Add Task Button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="task-button w-full lg:w-auto justify-center py-3 lg:py-2"
          >
            <Plus size={20} />
            <span className="font-medium">New Task</span>
          </button>
        </div>

        {/* Task List */}
        <TaskList
          activeCategory="all"
          tasks={filteredAndSortedTasks}
          onUpdate={updateTask}
          onDelete={handleDeleteClick}
          onReorder={handleReorder}
          onEdit={handleEdit}
          sortBy={sortBy}
          isFiltering={
            searchQuery !== "" ||
            activeCategory !== "all" ||
            activePriority !== "all"
          }
        />

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={createTask}
          editTask={editingTask}
          onUpdate={updateTask}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmation
          isOpen={deleteConfirmOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title={`Delete "${taskToDelete?.title}"?`}
          message="This task will be permanently deleted. This action cannot be undone."
          loading={deleting}
        />
      </div>
    </main>
  );
}
