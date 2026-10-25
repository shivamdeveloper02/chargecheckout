import { Text } from '@/components/Reusable';
import { forwardRef } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'border'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'destructive'
  | 'link'
  | 'dark'
  | 'gradient';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  textClassName?: string;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const variantContainerStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#004586] border border-[#004586] active:bg-[#003870]',
  gradient: 'bg-[#00D06C] border border-[#00D06C] active:opacity-90',
  secondary: 'bg-slate-100 border border-slate-200 active:bg-slate-200',
  border: 'bg-white border border-slate-300 active:bg-slate-50',
  outline: 'bg-transparent border border-slate-300 active:bg-slate-100',
  ghost: 'bg-transparent border border-transparent active:bg-slate-100',
  danger: 'bg-rose-600 border border-rose-600 active:bg-rose-700',
  destructive: 'bg-rose-50 border border-rose-200 active:bg-rose-100',
  link: 'bg-transparent border-0 p-0',
  dark: 'bg-slate-900 border border-slate-800 active:bg-slate-950',
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: 'text-white font-semibold',
  gradient: 'text-white font-bold',
  secondary: 'text-slate-800 font-semibold',
  border: 'text-slate-800 font-semibold',
  outline: 'text-slate-800 font-semibold',
  ghost: 'text-slate-700 font-semibold',
  danger: 'text-white font-semibold',
  destructive: 'text-rose-700 font-semibold',
  link: 'text-[#004586] font-semibold underline',
  dark: 'text-slate-100 font-semibold',
};

const sizeContainerStyles: Record<ButtonSize, string> = {
  xs: 'py-1.5 px-3 rounded-lg gap-1.5',
  sm: 'py-2 px-3.5 rounded-xl gap-1.5',
  md: 'py-3 px-4.5 rounded-xl gap-2',
  lg: 'py-3.5 px-5.5 rounded-2xl gap-2.5',
  icon: 'p-2.5 rounded-xl aspect-square items-center justify-center',
  'icon-sm': 'p-1.5 rounded-lg aspect-square items-center justify-center',
};

const sizeTextStyles: Record<ButtonSize, string> = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  icon: 'text-sm',
  'icon-sm': 'text-xs',
};

const getLoaderColor = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
    case 'gradient':
    case 'danger':
    case 'dark':
      return '#FFFFFF';
    case 'destructive':
      return '#E11D48';
    case 'secondary':
    case 'border':
    case 'outline':
    case 'ghost':
    case 'link':
    default:
      return '#004586';
  }
};

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      className = '',
      style,
      textClassName = '',
      textStyle,
      children,
      onPress,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const isIconOnly = size === 'icon' || size === 'icon-sm';
    const loaderColor = getLoaderColor(variant);

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        onPress={onPress}
        style={({ pressed }) => [
          style,
          pressed && !isDisabled && { opacity: 0.85, transform: [{ scale: 0.99 }] },
        ]}
        className={`
          flex-row items-center justify-center
          ${variantContainerStyles[variant] || variantContainerStyles.primary}
          ${sizeContainerStyles[size] || sizeContainerStyles.md}
          ${fullWidth ? 'w-full' : 'self-start'}
          ${isDisabled ? 'opacity-50' : ''}
          ${className}
        `}
        {...rest}
      >
        {isLoading ? (
          <View className="flex-row items-center justify-center gap-2">
            <ActivityIndicator size="small" color={loaderColor} />
            {children && !isIconOnly && typeof children === 'string' ? (
              <Text
                style={textStyle}
                className={`
                  ${variantTextStyles[variant] || variantTextStyles.primary}
                  ${sizeTextStyles[size] || sizeTextStyles.md}
                  ${textClassName}
                `}
              >
                {children}
              </Text>
            ) : null}
          </View>
        ) : (
          <View className="flex-row items-center justify-center gap-2">
            {leftIcon && <View className="items-center justify-center">{leftIcon}</View>}
            {children !== undefined && children !== null ? (
              typeof children === 'string' || typeof children === 'number' ? (
                <Text
                  style={textStyle}
                  className={`
                    ${variantTextStyles[variant] || variantTextStyles.primary}
                    ${sizeTextStyles[size] || sizeTextStyles.md}
                    ${textClassName}
                  `}
                >
                  {children}
                </Text>
              ) : (
                children
              )
            ) : null}
            {rightIcon && <View className="items-center justify-center">{rightIcon}</View>}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export default Button;
