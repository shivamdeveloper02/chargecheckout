import Icon from '@/components/Icon';
import { Text } from '@/Reusable';
import { forwardRef, useState } from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface TextareaProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  maxLength?: number;
  rows?: number;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  style?: StyleProp<TextStyle>;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      showCount = false,
      maxLength,
      rows = 4,
      containerClassName = '',
      containerStyle,
      fullWidth = true,
      disabled = false,
      required = false,
      className = '',
      style,
      value,
      placeholder,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const currentLength = typeof value === 'string' ? value.length : 0;

    const handleFocus: TextInputProps['onFocus'] = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: TextInputProps['onBlur'] = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View
        style={containerStyle}
        className={`${fullWidth ? 'w-full' : 'self-start'} ${containerClassName}`}
      >
        {label ? (
          <View className="flex-row items-center justify-between mb-1.5">
            <View className="flex-row items-center">
              <Text className="text-xs font-bold text-slate-700">{label}</Text>
              {required ? <Text className="text-rose-500 ml-0.5 font-bold">*</Text> : null}
            </View>
            {showCount && maxLength ? (
              <Text className="text-[10px] text-slate-400">
                {currentLength} / {maxLength}
              </Text>
            ) : null}
          </View>
        ) : null}

        <View
          className={`
            w-full bg-white border rounded-xl px-3.5 py-2.5
            ${disabled ? 'bg-slate-100 opacity-60' : ''}
            ${error
              ? 'border-rose-500'
              : isFocused
                ? 'border-blue-600'
                : 'border-slate-300'
            }
          `}
        >
          <TextInput
            ref={ref}
            multiline
            numberOfLines={rows}
            textAlignVertical="top"
            value={value}
            maxLength={maxLength}
            editable={!disabled}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[{ minHeight: rows * 22, fontFamily: 'Poppins-Regular' }, style]}
            className={`text-xs text-slate-900 ${className}`}
            {...rest}
          />
        </View>

        <View className="flex-row items-center justify-between mt-1">
          {error ? (
            <View className="flex-row items-center gap-1">
              <Icon name="close-circle" size={14} color="#E11D48" />
              <Text className="text-[11px] text-rose-600 font-medium">{error}</Text>
            </View>
          ) : hint ? (
            <Text className="text-[11px] text-slate-500">{hint}</Text>
          ) : (
            <View />
          )}

          {showCount && maxLength && !label ? (
            <Text className="text-[10px] text-slate-400">
              {currentLength} / {maxLength}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
