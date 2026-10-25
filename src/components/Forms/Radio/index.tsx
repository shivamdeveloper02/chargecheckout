import React from 'react';
import { Text } from '@/Reusable';
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from 'react-native';

export interface RadioProps {
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
  value?: string;
  name?: string;
}

export const Radio: React.FC<RadioProps> = ({
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
          w-5 h-5 rounded-full border items-center justify-center mt-0.5
          ${
            checked
              ? 'border-blue-600 bg-white'
              : 'border-slate-300 bg-white'
          }
          ${className}
        `}
      >
        {checked ? <View className="w-2.5 h-2.5 rounded-full bg-blue-600" /> : null}
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

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  name?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  direction = 'vertical',
  containerClassName = '',
  containerStyle,
}) => {
  return (
    <View style={containerStyle} className={`space-y-2 ${containerClassName}`}>
      {label ? (
        <Text className="text-xs font-bold text-slate-800 mb-1.5">{label}</Text>
      ) : null}
      <View
        className={`flex ${
          direction === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2.5'
        }`}
      >
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            disabled={opt.disabled}
            label={opt.label}
            description={opt.description}
          />
        ))}
      </View>
    </View>
  );
};

export default Radio;
