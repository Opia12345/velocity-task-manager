'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastType } from '../components/Toast';

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function useToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { id, type, title, message, duration };
    
    setToasts((prev) => [...prev, toast]);
  }, []);

  const success = useCallback((title: string, message?: string) => {
    addToast('success', title, message);
  }, [addToast]);

  const error = useCallback((title: string, message?: string) => {
    addToast('error', title, message);
  }, [addToast]);

  const warning = useCallback((title: string, message?: string) => {
    addToast('warning', title, message);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
  };
}

export { ToastContext };