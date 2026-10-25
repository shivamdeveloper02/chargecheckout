import Icon from '@/components/Icon';
import { Text } from '@/components/Reusable';
import type { ToastType } from '@/types';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from './toastStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const insets = useSafeAreaInsets();

  if (toasts.length === 0) return null;

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return (
          <View className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 items-center justify-center">
            <Icon name="checkmark-circle" size={18} color="#059669" />
          </View>
        );
      case 'error':
        return (
          <View className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 items-center justify-center">
            <Icon name="alert-circle" size={18} color="#E11D48" />
          </View>
        );
      case 'warning':
        return (
          <View className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 items-center justify-center">
            <Icon name="warning-outline" size={18} color="#D97706" />
          </View>
        );
      case 'info':
      default:
        return (
          <View className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 items-center justify-center">
            <Icon name="information-circle" size={18} color="#2563EB" />
          </View>
        );
    }
  };

  const topOffset = Math.max(insets.top + 8, Platform.OS === 'android' ? 24 : 12);

  return (
    <View
      pointerEvents="box-none"
      style={{ top: topOffset }}
      className="absolute left-4 right-4 z-50 flex-col gap-2.5 items-center"
    >
      {toasts.map((t) => (
        <View
          key={t.id}
          className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-3.5 shadow-lg flex-row items-start gap-3"
        >
          {getToastIcon(t.type)}
          <View className="flex-1 pt-0.5">
            {t.title ? (
              <Text className="text-xs font-bold text-slate-900 tracking-tight leading-snug">
                {t.title}
              </Text>
            ) : null}
            <Text className="text-xs text-slate-600 leading-relaxed mt-0.5">{t.message}</Text>
          </View>
          <Pressable
            onPress={() => removeToast(t.id)}
            hitSlop={8}
            className="p-1 rounded-lg active:bg-slate-100"
          >
            <Icon name="close" size={16} color="#94A3B8" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default ToastContainer;
