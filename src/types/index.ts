import { Icon } from "@/components";

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}
export interface ToastOptions {
  title?: string;
  duration?: number;
}
export interface MenuItem {
  id: string;
  label: string;
  iconName: string;
  iconType?: React.ComponentProps<typeof Icon>['type'];
  badge?: string;
  onPress?: () => void;
}