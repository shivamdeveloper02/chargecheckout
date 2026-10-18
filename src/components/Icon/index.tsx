import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
} from '@expo/vector-icons';

const iconSets = {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
  AntDesign,
  Entypo,
  EvilIcons,
  Foundation,
  Octicons,
  SimpleLineIcons,
  Fontisto,
};

export type IconSetName = keyof typeof iconSets;

const ioniconsNameMap: Record<string, string> = {
  ArrowLeft: 'arrow-back',
  'arrow-left': 'arrow-back',
  X: 'close',
  x: 'close',
  Close: 'close',
  close: 'close',
  Check: 'checkmark',
  check: 'checkmark',
  CheckCircle: 'checkmark-circle',
  CircleCheck: 'checkmark-circle',
  CircleX: 'close-circle',
  CircleAlert: 'alert-circle',
  AlertCircle: 'alert-circle',
  TriangleAlert: 'warning-outline',
  AlertTriangle: 'warning-outline',
  Info: 'information-circle',
  info: 'information-circle',
  Mail: 'mail-outline',
  mail: 'mail-outline',
  Lock: 'lock-closed-outline',
  lock: 'lock-closed-outline',
  Eye: 'eye-outline',
  eye: 'eye-outline',
  EyeOff: 'eye-off-outline',
  'eye-off': 'eye-off-outline',
  ChevronDown: 'chevron-down',
  'chevron-down': 'chevron-down',
  ChevronUp: 'chevron-up',
  'chevron-up': 'chevron-up',
  ChevronLeft: 'chevron-back',
  'chevron-left': 'chevron-back',
  ChevronRight: 'chevron-forward',
  'chevron-right': 'chevron-forward',
  Search: 'search-outline',
  search: 'search-outline',
  Calendar: 'calendar-outline',
  calendar: 'calendar-outline',
};

export interface IconProps {
  name: string;
  type?: IconSetName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
  fallback?: React.ReactNode;
}

export const Icon: React.FC<IconProps> = ({
  name,
  type = 'Ionicons',
  size = 20,
  color = '#0F172A',
  style,
  className = '',
  fallback,
}) => {
  const IconComponent = iconSets[type] ?? Ionicons;

  const isValidIcon = name && typeof name === 'string';
  if (!isValidIcon) {
    return fallback ? <>{fallback}</> : null;
  }

  const resolvedName =
    type === 'Ionicons' && ioniconsNameMap[name]
      ? ioniconsNameMap[name]
      : name;

  return (
    <View style={style} className={className}>
      <IconComponent
        name={resolvedName as never}
        size={size}
        color={color}
      />
    </View>
  );
};

export default Icon;