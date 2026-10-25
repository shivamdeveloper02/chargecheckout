import Icon from '@/components/Icon';
import { Text } from '@/components/Reusable';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  label?: string;
  error?: string;
  hint?: string;
  options: (MultiSelectOption | string)[];
  value?: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  required?: boolean;
  maxDisplayTags?: number;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  error,
  hint,
  options,
  value = [],
  onChange,
  placeholder = 'Select options...',
  searchable = true,
  disabled = false,
  required = false,
  maxDisplayTags = 3,
  containerClassName = '',
  containerStyle,
  fullWidth = true,
  className = '',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const normalizedOptions: MultiSelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const removeTag = (tagValue: string) => {
    onChange(value.filter((v) => v !== tagValue));
  };

  const handleSelectAll = () => {
    const enabledValues = normalizedOptions.filter((o) => !o.disabled).map((o) => o.value);
    onChange(enabledValues);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const selectedOptions = normalizedOptions.filter((o) => value.includes(o.value));
  const hiddenCount = value.length > maxDisplayTags ? value.length - maxDisplayTags : 0;

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
          w-full min-h-[46px] py-2 px-3 bg-white border rounded-xl flex-row items-center justify-between
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
        <View className="flex-row flex-wrap items-center gap-1.5 flex-1 mr-2">
          {selectedOptions.length === 0 ? (
            <Text className="text-xs text-slate-400">{placeholder}</Text>
          ) : (
            <>
              {selectedOptions.slice(0, maxDisplayTags).map((opt) => (
                <View
                  key={opt.value}
                  className="flex-row items-center gap-1 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <Text numberOfLines={1} className="text-xs font-semibold text-blue-800 max-w-[100px]">
                    {opt.label}
                  </Text>
                  {!disabled ? (
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        removeTag(opt.value);
                      }}
                      hitSlop={6}
                    >
                      <Icon name="close" size={12} color="#2563EB" />
                    </Pressable>
                  ) : null}
                </View>
              ))}

              {hiddenCount > 0 ? (
                <View className="px-1.5 py-0.5 bg-slate-200 rounded-md">
                  <Text className="text-[10px] font-bold text-slate-700">+{hiddenCount}</Text>
                </View>
              ) : null}
            </>
          )}
        </View>

        <Icon name="chevron-down" size={16} color="#94A3B8" />
      </Pressable>

      {error ? (
        <View className="flex-row items-center gap-1 mt-1.5">
          <Icon name="close-circle" size={14} color="#E11D48" />
          <Text className="text-[11px] text-rose-600 font-medium">{error}</Text>
        </View>
      ) : hint ? (
        <Text className="mt-1 text-[11px] text-slate-500">{hint}</Text>
      ) : null}

      {/* MultiSelect Modal Sheet */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 justify-end bg-black/45">
          <Pressable onPress={() => setIsOpen(false)} className="flex-1" />
          <View
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            className="bg-white rounded-t-3xl max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-slate-100">
              <Text className="text-sm font-bold text-slate-900">
                {label || placeholder}
              </Text>
              <Pressable
                onPress={() => setIsOpen(false)}
                hitSlop={8}
                className="p-1 rounded-xl active:bg-slate-100"
              >
                <Icon name="close" size={18} color="#94A3B8" />
              </Pressable>
            </View>

            {/* Search Input */}
            {searchable ? (
              <View className="px-4 pt-3 pb-2">
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <Icon name="search-outline" size={16} color="#94A3B8" />
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search options..."
                    placeholderTextColor="#94A3B8"
                    style={{ fontFamily: 'Poppins-Regular' }}
                    className="flex-1 ml-2 text-xs text-slate-900"
                  />
                  {searchQuery ? (
                    <Pressable onPress={() => setSearchQuery('')} hitSlop={6}>
                      <Icon name="close" size={14} color="#94A3B8" />
                    </Pressable>
                  ) : null}
                </View>
              </View>
            ) : null}

            {/* Quick Actions */}
            <View className="flex-row items-center justify-between px-5 py-2 border-b border-slate-100">
              <Pressable onPress={handleSelectAll} hitSlop={6}>
                <Text className="text-xs font-semibold text-blue-600">Select All</Text>
              </Pressable>
              <Pressable onPress={handleClearAll} hitSlop={6}>
                <Text className="text-xs font-semibold text-rose-500">Clear All</Text>
              </Pressable>
            </View>

            {/* Scrollable Options */}
            <ScrollView className="px-3 py-2 max-h-[50vh]" bounces={false}>
              {filteredOptions.length === 0 ? (
                <View className="py-8 items-center justify-center">
                  <Text className="text-xs text-slate-400">No options found</Text>
                </View>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = value.includes(opt.value);
                  return (
                    <Pressable
                      key={opt.value}
                      disabled={opt.disabled}
                      onPress={() => toggleOption(opt.value)}
                      className={`
                        flex-row items-center justify-between px-4 py-3 rounded-xl my-0.5
                        ${opt.disabled ? 'opacity-40' : 'active:bg-slate-100'}
                        ${isSelected ? 'bg-blue-50' : ''}
                      `}
                    >
                      <View className="flex-1 mr-2">
                        <Text
                          className={`text-xs ${isSelected
                              ? 'font-bold text-blue-800'
                              : 'font-medium text-slate-800'
                            }`}
                        >
                          {opt.label}
                        </Text>
                        {opt.description ? (
                          <Text className="text-[10px] text-slate-400 mt-0.5">
                            {opt.description}
                          </Text>
                        ) : null}
                      </View>
                      {isSelected ? (
                        <Icon name="checkmark" size={16} color="#2563EB" />
                      ) : null}
                    </Pressable>
                  );
                })
              )}
            </ScrollView>

            {/* Bottom Done Button */}
            <View className="px-4 pt-2">
              <Pressable
                onPress={() => setIsOpen(false)}
                className="w-full bg-[#004586] py-3 rounded-xl items-center justify-center active:opacity-90"
              >
                <Text className="text-xs font-bold text-white">Done ({value.length})</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MultiSelect;
