'use client';

import { ReactNode } from 'react';
import { ToastContext, useToastProvider } from '../hooks/useToast';
import { ToastContainer } from './Toast';

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const toastContext = useToastProvider();

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
      <ToastContainer toasts={toastContext.toasts} onRemove={toastContext.removeToast} />
    </ToastContext.Provider>
  );
}