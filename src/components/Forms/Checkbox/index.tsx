import React from 'react';
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import Icon from '@/components/Icon';

export interface CheckboxProps {
  label?: React.ReactNode;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  className?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  containerClassName = '',
  containerStyle,
  className = '',
  style,
  labelStyle,
  descriptionStyle,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange?.(!checked)}
      style={containerStyle}
      className={`flex-row items-start gap-2.5 ${
        disabled ? 'opacity-50' : 'active:opacity-85'
      } ${containerClassName}`}
    >
      <View
        style={style}
        className={`
          w-5 h-5 rounded-md border items-center justify-center mt-0.5
          ${
            checked
              ? 'bg-blue-600 border-blue-600'
              : 'bg-white border-slate-300'
          }
          ${className}
        `}
      >
        {checked ? <Icon name="Check" size={14} color="#FFFFFF" strokeWidth={3} /> : null}
      </View>

      {label || description ? (
        <View className="flex-1">
          {label ? (
            typeof label === 'string' ? (
              <Text
                style={labelStyle}
                className="text-xs font-semibold text-slate-800 leading-tight"
              >
                {label}
              </Text>
            ) : (
              label
            )
          ) : null}
          {description ? (
            <Text
              style={descriptionStyle}
              className="text-[11px] text-slate-500 mt-0.5 leading-relaxed"
            >
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
};

export default Checkbox;
