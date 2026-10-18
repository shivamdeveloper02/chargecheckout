import Icon from '@/components/Icon';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  error?: string;
  hint?: string;
  options: (SelectOption | string | number)[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  hint,
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  leftIcon,
  containerClassName = '',
  containerStyle,
  fullWidth = true,
  disabled = false,
  required = false,
  className = '',
  style,
  textStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setIsOpen(false);
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
        disabled={disabled}
        onPress={() => setIsOpen(true)}
        style={style}
        className={`
          w-full py-3 px-3.5 bg-white border rounded-xl flex-row items-center justify-between
          ${disabled ? 'bg-slate-100 opacity-60' : 'active:bg-slate-50'}
          ${error
            ? 'border-rose-500'
            : isOpen
              ? 'border-blue-600'
              : 'border-slate-300'
          }
          ${className}
        `}
      >
        <View className="flex-row items-center flex-1 mr-2">
          {leftIcon ? (
            <View className="mr-2.5 items-center justify-center">{leftIcon}</View>
          ) : null}
          <Text
            style={textStyle}
            numberOfLines={1}
            className={`text-xs ${selectedOption ? 'font-semibold text-slate-900' : 'text-slate-400'
              }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>

        <Icon
          name="ChevronDown"
          size={16}
          color="#94A3B8"
        />
      </Pressable>

      {error ? (
        <View className="flex-row items-center gap-1 mt-1.5">
          <Icon name="CircleX" size={13} color="#E11D48" />
          <Text className="text-[11px] text-rose-600 font-medium">{error}</Text>
        </View>
      ) : hint ? (
        <Text className="mt-1 text-[11px] text-slate-500">{hint}</Text>
      ) : null}

      {/* Options Selection Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 justify-end bg-black/45">
          <Pressable
            onPress={() => setIsOpen(false)}
            className="flex-1"
          />
          <View
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            className="bg-white rounded-t-3xl max-h-[75vh] overflow-hidden"
          >
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-slate-100">
              <Text className="text-sm font-bold text-slate-900">
                {label || placeholder}
              </Text>
              <Pressable
                onPress={() => setIsOpen(false)}
                hitSlop={8}
                className="p-1 rounded-xl active:bg-slate-100"
              >
                <Icon name="X" size={18} color="#94A3B8" />
              </Pressable>
            </View>

            {/* Options List */}
            <ScrollView className="px-3 py-2" bounces={false}>
              {normalizedOptions.map((opt) => {
                const isSelected = String(opt.value) === String(value);
                return (
                  <Pressable
                    key={String(opt.value)}
                    disabled={opt.disabled}
                    onPress={() => handleSelect(opt)}
                    className={`
                      flex-row items-center justify-between px-4 py-3 rounded-xl my-0.5
                      ${opt.disabled ? 'opacity-40' : 'active:bg-slate-100'}
                      ${isSelected ? 'bg-blue-50' : ''}
                    `}
                  >
                    <Text
                      className={`text-xs ${isSelected
                          ? 'font-bold text-blue-700'
                          : 'font-medium text-slate-800'
                        }`}
                    >
                      {opt.label}
                    </Text>
                    {isSelected ? (
                      <Icon name="Check" size={16} color="#2563EB" strokeWidth={2.5} />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Select;
