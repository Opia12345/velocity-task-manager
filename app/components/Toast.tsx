"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
};

const toastStyles = {
  success: "bg-green-500/90 border-green-400/50 text-white",
  error: "bg-red-500/90 border-red-400/50 text-white",
  warning: "bg-yellow-500/90 border-yellow-400/50 text-white",
};

export function ToastItem({ toast, onRemove }: ToastProps) {
  const Icon = toastIcons[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-md shadow-lg
        ${toastStyles[toast.type]}
        min-w-[320px] max-w-md p-4
      `}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      <div className="relative flex items-start gap-3">
        <Icon size={20} className="shrink-0 mt-0.5" />

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{toast.title}</h4>
          {toast.message && (
            <p className="text-sm opacity-90 mt-1">{toast.message}</p>
          )}
        </div>

        <button
          onClick={() => onRemove(toast.id)}
          className="shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{
          duration: (toast.duration || 5000) / 1000,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 h-1 bg-white/30"
      />
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-100 space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}
