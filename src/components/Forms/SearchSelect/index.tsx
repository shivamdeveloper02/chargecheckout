import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@/components/Icon';

export interface SearchSelectOption {
  value: string | number;
  label: string;
  subLabel?: string;
  badge?: string;
  badgeColor?: string;
  disabled?: boolean;
}

export interface SearchSelectProps {
  label?: string;
  error?: string;
  hint?: string;
  options: (SearchSelectOption | string | number)[];
  value?: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  leftIcon?: React.ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  className?: string;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  noOptionsText?: string;
  id?: string;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  label,
  error,
  hint,
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search options...',
  leftIcon,
  clearable = false,
  disabled = false,
  required = false,
  searchable = true,
  containerClassName = '',
  containerStyle,
  className = '',
  style,
  fullWidth = true,
  noOptionsText = 'No matching options found',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const normalizedOptions: SearchSelectOption[] = options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  const filteredOptions = normalizedOptions.filter((opt) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchLabel = opt.label.toLowerCase().includes(query);
    const matchSubLabel = opt.subLabel ? opt.subLabel.toLowerCase().includes(query) : false;
    const matchVal = String(opt.value).toLowerCase().includes(query);
    return matchLabel || matchSubLabel || matchVal;
  });

  const handleSelect = (optValue: string | number) => {
    onChange(String(optValue));
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = () => {
    onChange('');
    setSearchQuery('');
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
          ${
            error
              ? 'border-rose-500'
              : isOpen
              ? 'border-blue-600'
              : 'border-slate-300'
          }
          ${className}
        `}
      >
        <View className="flex-row items-center flex-1 mr-2 min-w-0">
          {leftIcon ? (
            <View className="mr-2.5 items-center justify-center">{leftIcon}</View>
          ) : null}

          {selectedOption ? (
            <View className="flex-row items-center gap-2 flex-1 min-w-0">
              <Text numberOfLines={1} className="text-xs font-semibold text-slate-900">
                {selectedOption.label}
              </Text>
              {selectedOption.subLabel ? (
                <Text numberOfLines={1} className="text-[11px] text-slate-400">
                  • {selectedOption.subLabel}
                </Text>
              ) : null}
            </View>
          ) : (
            <Text numberOfLines={1} className="text-xs text-slate-400">
              {placeholder}
            </Text>
          )}
        </View>

        <View className="flex-row items-center gap-1.5">
          {clearable && selectedOption && !disabled ? (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              hitSlop={6}
              className="p-0.5 rounded"
            >
              <Icon name="X" size={14} color="#94A3B8" />
            </Pressable>
          ) : null}
          <Icon name="ChevronDown" size={16} color="#94A3B8" />
        </View>
      </Pressable>

      {error ? (
        <View className="flex-row items-center gap-1 mt-1.5">
          <Icon name="CircleX" size={13} color="#E11D48" />
          <Text className="text-[11px] text-rose-600 font-medium">{error}</Text>
        </View>
      ) : hint ? (
        <Text className="mt-1 text-[11px] text-slate-500">{hint}</Text>
      ) : null}

      {/* Search Select Modal */}
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
                <Icon name="X" size={18} color="#94A3B8" />
              </Pressable>
            </View>

            {/* Search Input */}
            {searchable ? (
              <View className="px-4 pt-3 pb-2">
                <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <Icon name="Search" size={15} color="#94A3B8" />
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={searchPlaceholder}
                    placeholderTextColor="#94A3B8"
                    className="flex-1 ml-2 text-xs text-slate-900"
                  />
                  {searchQuery ? (
                    <Pressable onPress={() => setSearchQuery('')} hitSlop={6}>
                      <Icon name="X" size={14} color="#94A3B8" />
                    </Pressable>
                  ) : null}
                </View>
              </View>
            ) : null}

            {/* Scrollable Options List */}
            <ScrollView className="px-3 py-2 max-h-[55vh]" bounces={false}>
              {filteredOptions.length === 0 ? (
                <View className="py-8 items-center justify-center">
                  <Icon name="Search" size={20} color="#CBD5E1" />
                  <Text className="text-xs text-slate-400 mt-1">{noOptionsText}</Text>
                </View>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = String(opt.value) === String(value);
                  return (
                    <Pressable
                      key={String(opt.value)}
                      disabled={opt.disabled}
                      onPress={() => handleSelect(opt.value)}
                      className={`
                        flex-row items-center justify-between px-4 py-3 rounded-xl my-0.5
                        ${opt.disabled ? 'opacity-40' : 'active:bg-slate-100'}
                        ${isSelected ? 'bg-blue-50' : ''}
                      `}
                    >
                      <View className="flex-1 mr-2">
                        <View className="flex-row items-center gap-2">
                          <Text
                            className={`text-xs ${
                              isSelected
                                ? 'font-bold text-blue-800'
                                : 'font-medium text-slate-800'
                            }`}
                          >
                            {opt.label}
                          </Text>
                          {opt.badge ? (
                            <View
                              className={`px-1.5 py-0.5 rounded border ${
                                opt.badgeColor || 'bg-slate-100 border-slate-200'
                              }`}
                            >
                              <Text className="text-[10px] font-bold text-slate-600">
                                {opt.badge}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                        {opt.subLabel ? (
                          <Text className="text-[10px] text-slate-400 mt-0.5 font-normal">
                            {opt.subLabel}
                          </Text>
                        ) : null}
                      </View>

                      {isSelected ? (
                        <Icon name="Check" size={16} color="#2563EB" strokeWidth={2.5} />
                      ) : null}
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const CustomSelect = SearchSelect;

export default SearchSelect;
