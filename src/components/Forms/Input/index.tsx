import Icon from '@/components/Icon';
import React, { forwardRef, useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  required?: boolean;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<TextStyle>;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      containerClassName = '',
      containerStyle,
      fullWidth = true,
      type = 'text',
      required = false,
      disabled = false,
      className = '',
      style,
      value,
      placeholder,
      secureTextEntry,
      keyboardType: customKeyboardType,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password' || secureTextEntry;

    let keyboardType: KeyboardTypeOptions = customKeyboardType || 'default';
    if (type === 'email') keyboardType = 'email-address';
    if (type === 'number') keyboardType = 'numeric';
    if (type === 'tel') keyboardType = 'phone-pad';

    const hasValue = value !== undefined && value !== '';

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
          <View className="flex-row items-center mb-1.5">
            <Text className="text-xs font-bold text-slate-700">{label}</Text>
            {required ? <Text className="text-rose-500 ml-0.5 font-bold">*</Text> : null}
          </View>
        ) : null}

        <View
          className={`
            w-full flex-row items-center bg-white border rounded-xl px-3.5 py-1.5
            ${disabled ? 'bg-slate-100 opacity-60' : ''}
            ${error
              ? 'border-rose-500'
              : isFocused
                ? 'border-blue-600'
                : 'border-slate-300'
            }
          `}
        >
          {leftIcon ? (
            <View className="mr-2.5 items-center justify-center">{leftIcon}</View>
          ) : null}

          <TextInput
            ref={ref}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            editable={!disabled}
            keyboardType={keyboardType}
            secureTextEntry={isPassword && !showPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={style}
            className={`flex-1 py-3 text-xs text-slate-900 ${className}`}
            {...rest}
          />
          {isPassword && (
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={8}
              className="ml-2 items-center justify-center"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color="#94A3B8"
              />
            </Pressable>
          ) }
        </View>

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

Input.displayName = 'Input';

export default Input;
