import { useEffect, useState } from 'react';
import type { ToastItem, ToastOptions, ToastType } from '@/types';

type ToastListener = (toasts: ToastItem[]) => void;

class ToastManager {
  private toasts: ToastItem[] = [];
  private listeners: Set<ToastListener> = new Set();
  private timers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  private notify() {
    const copy = [...this.toasts];
    this.listeners.forEach((listener) => listener(copy));
  }

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getToasts() {
    return [...this.toasts];
  }

  show(type: ToastType, message: string, options?: ToastOptions | string): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const title = typeof options === 'string' ? options : options?.title;
    const duration = typeof options === 'object' && options?.duration !== undefined ? options.duration : 4000;

    const item: ToastItem = {
      id,
      type,
      message,
      title,
      duration,
    };

    // Keep max 3 toasts visible at once
    this.toasts = [item, ...this.toasts.slice(0, 2)];
    this.notify();

    if (duration > 0) {
      const timer = setTimeout(() => {
        this.remove(id);
      }, duration);
      this.timers.set(id, timer);
    }

    return id;
  }

  remove(id: string) {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  clear() {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.toasts = [];
    this.notify();
  }

  success(message: string, options?: ToastOptions | string) {
    return this.show('success', message, options);
  }

  error(message: string, options?: ToastOptions | string) {
    return this.show('error', message, options);
  }

  warning(message: string, options?: ToastOptions | string) {
    return this.show('warning', message, options);
  }

  info(message: string, options?: ToastOptions | string) {
    return this.show('info', message, options);
  }
}

export const toast = new ToastManager();

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>(() => toast.getToasts());

  useEffect(() => {
    return toast.subscribe(setToasts);
  }, []);

  return {
    toasts,
    showToast: (type: ToastType, message: string, options?: ToastOptions | string) =>
      toast.show(type, message, options),
    removeToast: (id: string) => toast.remove(id),
    clearToasts: () => toast.clear(),
    success: (message: string, options?: ToastOptions | string) => toast.success(message, options),
    error: (message: string, options?: ToastOptions | string) => toast.error(message, options),
    warning: (message: string, options?: ToastOptions | string) => toast.warning(message, options),
    info: (message: string, options?: ToastOptions | string) => toast.info(message, options),
  };
}
