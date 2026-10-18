import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import type { LucideProps } from 'lucide-react-native';

export type IconName = keyof typeof LucideIcons | string;

export interface IconProps extends Omit<LucideProps, 'size' | 'color' | 'strokeWidth' | 'style'> {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
  fallback?: React.ReactNode;
}

const toPascalCase = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  strokeWidth = 2,
  color = '#0F172A',
  className = '',
  style,
  fallback,
  ...props
}) => {
  if (!name || typeof name !== 'string') return null;

  const pascalName = toPascalCase(name);
  const iconMap = LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>;
  const IconComponent = iconMap[name] || iconMap[pascalName];

  if (!IconComponent) {
    if (fallback) return <>{fallback}</>;
    const HelpIcon = (LucideIcons as any).CircleHelp || (LucideIcons as any).HelpCircle;
    if (HelpIcon) {
      return (
        <View style={style} className={className}>
          <HelpIcon size={size} strokeWidth={strokeWidth} color="#94A3B8" {...props} />
        </View>
      );
    }
    return null;
  }

  return (
    <View style={style} className={className}>
      <IconComponent size={size} strokeWidth={strokeWidth} color={color} {...props} />
    </View>
  );
};

export default Icon;
