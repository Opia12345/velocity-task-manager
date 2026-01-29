'use client';

import { useEffect, useState } from 'react';
import { CreateTaskData, Task } from '../lib/types';
import { pb } from '../lib/pocketbase';
import { useToast } from './useToast';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  // Fetch initial tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const records = await pb.collection('tasks').getFullList<Task>({
          sort: 'order,created',
        });
        setTasks(records);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        error('Failed to load tasks', 'Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    // Subscribe to real-time updates
    pb.collection('tasks').subscribe<Task>('*', (e: any) => {
      if (e.action === 'create') {
        setTasks((prev) => [...prev, e.record]);
      } else if (e.action === 'update') {
        setTasks((prev) =>
          prev.map((task) => (task.id === e.record.id ? e.record : task))
        );
      } else if (e.action === 'delete') {
        setTasks((prev) => prev.filter((task) => task.id !== e.record.id));
      }
    });

    return () => {
      pb.collection('tasks').unsubscribe('*');
    };
  }, [error]);

  // Create task
  const createTask = async (data: CreateTaskData) => {
    try {
      await pb.collection('tasks').create(data);
      success('Task created!', `"${data.title}" has been added to your list.`);
    } catch (err) {
      console.error('Error creating task:', err);
      error('Failed to create task', 'Please try again.');
      throw err;
    }
  };

  // Update task
  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      await pb.collection('tasks').update(id, data);
      if (data.completed !== undefined) {
        success(
          data.completed ? 'Task completed!' : 'Task reopened',
          data.completed ? 'Great job! Keep up the momentum.' : 'Task marked as active again.'
        );
      } else {
        success('Task updated!', 'Your changes have been saved.');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      error('Failed to update task', 'Please try again.');
      throw err;
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      await pb.collection('tasks').delete(id);
      success('Task deleted', 'The task has been removed from your list.');
    } catch (err) {
      console.error('Error deleting task:', err);
      error('Failed to delete task', 'Please try again.');
      throw err;
    }
  };

  // Reorder tasks
  const reorderTasks = async (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
    
    try {
      // Update order for each task
      const updates = reorderedTasks.map((task, index) => 
        pb.collection('tasks').update(task.id, { order: index })
      );
      await Promise.all(updates);
    } catch (err) {
      console.error('Error reordering tasks:', err);
      error('Failed to save task order', 'The order will be restored on refresh.');
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks,
  };
}