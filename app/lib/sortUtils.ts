import { Task } from "./types";
import { SortOption, SortDirection } from "../components/SortDropdown";

export function sortTasks(
  tasks: Task[],
  sortBy: SortOption,
  direction: SortDirection,
): Task[] {
  if (sortBy === "manual") {
    return [...tasks].sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderA - orderB;
    });
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "created":
        comparison =
          new Date(a.created).getTime() - new Date(b.created).getTime();
        break;

      case "updated":
        comparison =
          new Date(a.updated).getTime() - new Date(b.updated).getTime();
        break;

      case "title":
        comparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        break;

      case "completed":
        if (a.completed === b.completed) {
          comparison =
            new Date(a.created).getTime() - new Date(b.created).getTime();
        } else {
          comparison = a.completed ? 1 : -1;
        }
        break;

      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityA = priorityOrder[a.priority || "low"];
        const priorityB = priorityOrder[b.priority || "low"];
        comparison = priorityA - priorityB;
        break;

      case "dueDate":
        if (!a.dueDate && !b.dueDate) {
          comparison =
            new Date(a.created).getTime() - new Date(b.created).getTime();
        } else if (!a.dueDate) {
          comparison = 1;
        } else if (!b.dueDate) {
          comparison = -1;
        } else {
          comparison =
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        break;

      default:
        comparison = 0;
    }

    return direction === "desc" ? -comparison : comparison;
  });

  return sortedTasks;
}
