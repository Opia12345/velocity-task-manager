export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'urgent' | 'other';
  completed: boolean;
  order: number;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  created: string;
  updated: string;
}

export type TaskCategory = 'work' | 'personal' | 'urgent' | 'other';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface CreateTaskData {
  title: string;
  description?: string;
  category: TaskCategory;
  completed?: boolean;
  order?: number;
  priority?: TaskPriority;
  dueDate?: string;
}