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
export interface ContactOption {
  id: string;
  label: string;
  iconName: string;
  iconType?: React.ComponentProps<typeof Icon>['type'];
  action: () => void | Promise<void>;
}
export type CouponCategory = 'my_coupons' | 'charging' | 'wallet';

export interface CouponTab {
  id: CouponCategory;
  label: string;
}

export interface CouponItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  badgeTop: string;
  badgeBottom: string;
  category: CouponCategory;
  terms: string[];
}