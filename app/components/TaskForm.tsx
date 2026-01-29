"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CreateTaskData, Task, TaskCategory, TaskPriority } from "../lib/types";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskData) => Promise<void>;
  editTask?: Task | null;
  onUpdate?: (id: string, data: Partial<Task>) => Promise<void>;
}

// Validation Schema
const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title is too short")
    .max(50, "Title is too long")
    .required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .max(200, "Description is too long"),
  category: Yup.string().required("Category is required"),
  priority: Yup.string().required("Priority is required"),
  dueDate: Yup.string().nullable(),
});

export function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  editTask,
  onUpdate,
}: TaskFormProps) {
  const formik = useFormik({
    initialValues: {
      title: editTask?.title || "",
      description: editTask?.description || "",
      category: (editTask?.category as TaskCategory) || "work",
      priority: (editTask?.priority as TaskPriority) || "medium",
      dueDate: editTask?.dueDate || "",
    },
    enableReinitialize: true,
    validationSchema: TaskSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          ...values,
          dueDate: values.dueDate || undefined,
        };

        if (editTask && onUpdate) {
          await onUpdate(editTask.id, payload);
        } else {
          await onSubmit({
            ...payload,
            completed: false,
            order: 0,
          });
        }
        resetForm();
        onClose();
      } catch (error) {
        console.error("Error submitting task:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editTask ? "Edit Task" : "Create New Task"}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 transition-all ${
                      formik.touched.title && formik.errors.title
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-teal-500"
                    }`}
                    placeholder="Enter task title"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                    placeholder="Enter task description"
                  />
                </div>
                {formik.touched.description && formik.errors.description && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.description}
                  </p>
                )}

                {/* Category and Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="urgent">Urgent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="priority"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      onChange={formik.handleChange}
                      value={formik.values.priority}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.dueDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formik.isSubmitting
                      ? "Saving..."
                      : editTask
                        ? "Update"
                        : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
