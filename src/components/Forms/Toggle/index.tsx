import { Text } from '@/components/Reusable';
import React from 'react';
import {
  Platform,
  Pressable,
  StyleProp,
  Switch,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  id?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  containerClassName = '',
  containerStyle,
  labelStyle,
  descriptionStyle,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!checked)}
      style={containerStyle}
      className={`flex-row items-center justify-between gap-3 ${disabled ? 'opacity-50' : 'active:opacity-85'
        } ${containerClassName}`}
    >
      {label || description ? (
        <View className="flex-1">
          {label ? (
            <Text
              style={labelStyle}
              className="text-xs font-bold text-slate-800"
            >
              {label}
            </Text>
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

      <Switch
        value={checked}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
        thumbColor={Platform.OS === 'android' ? (checked ? '#FFFFFF' : '#F8FAFC') : '#FFFFFF'}
        ios_backgroundColor="#E2E8F0"
        style={{
          transform: [
            { scaleX: size === 'sm' ? 0.75 : size === 'lg' ? 1.15 : 0.9 },
            { scaleY: size === 'sm' ? 0.75 : size === 'lg' ? 1.15 : 0.9 },
          ],
        }}
      />
    </Pressable>
  );
};

export default Toggle;
