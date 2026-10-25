import React, { forwardRef, useState } from 'react';
import { Text } from '@/Reusable';
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Icon from '@/components/Icon';

export interface DateSelectProps extends Omit<TextInputProps, 'style' | 'onChange'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  style?: StyleProp<TextStyle>;
  value?: string;
  onChange?: (value: string) => void;
  onPress?: () => void;
}

export const DateSelect = forwardRef<TextInput, DateSelectProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      clearable = true,
      onClear,
      containerClassName = '',
      containerStyle,
      fullWidth = true,
      disabled = false,
      required = false,
      className = '',
      style,
      value,
      onChange,
      onChangeText,
      onPress,
      placeholder = 'YYYY-MM-DD',
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '';

    const handleTextChange = (text: string) => {
      onChangeText?.(text);
      onChange?.(text);
    };

    return (
      <View
        style={containerStyle}
        className={`${fullWidth ? 'w-full' : 'self-start'} ${containerClassName}`}
      >
        {label ? (
          <View className="flex-row items-center mb-1.5">
            <Text className="text-xs font-bold text-slate-700">{label}</Text>
            {required ? <Text className="text-rose-500 ml-0.5 font-bold">*</Text> : null}
          </View>
        ) : null}

        <Pressable
          onPress={onPress}
          className={`
            w-full flex-row items-center bg-white border rounded-xl px-3.5
            ${disabled ? 'bg-slate-100 opacity-60' : ''}
            ${
              error
                ? 'border-rose-500'
                : isFocused
                ? 'border-blue-600'
                : 'border-slate-300'
            }
          `}
        >
          <View className="mr-2.5 items-center justify-center">
            {leftIcon || <Icon name="calendar-outline" size={17} color="#94A3B8" />}
          </View>

          <TextInput
            ref={ref}
            value={value}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[{ fontFamily: 'Poppins-Regular' }, style]}
            className={`flex-1 py-3 text-xs text-slate-900 ${className}`}
            {...rest}
          />

          {clearable && hasValue && onClear && !disabled ? (
            <Pressable
              onPress={onClear}
              hitSlop={8}
              className="ml-2 items-center justify-center"
              accessibilityLabel="Clear date"
            >
              <Icon name="close" size={16} color="#94A3B8" />
            </Pressable>
          ) : null}
        </Pressable>

        {error ? (
          <View className="flex-row items-center gap-1 mt-1.5">
            <Icon name="close-circle" size={14} color="#E11D48" />
            <Text className="text-[11px] text-rose-600 font-medium">{error}</Text>
          </View>
        ) : hint ? (
          <Text className="mt-1 text-[11px] text-slate-500">{hint}</Text>
        ) : null}
      </View>
    );
  }
);

DateSelect.displayName = 'DateSelect';

export default DateSelect;
