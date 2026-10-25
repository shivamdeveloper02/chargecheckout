import { Text } from '@/components/Reusable';
import React from 'react';
import { StyleProp, TextStyle, View, ViewProps, ViewStyle } from 'react-native';

export type CardVariant = 'default' | 'flat' | 'outline' | 'ghost' | 'none';

export interface CardProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  noPadding?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface CardHeaderProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface CardTitleProps {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
}

export interface CardDescriptionProps {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
}

export interface CardBodyProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface CardFooterProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white border border-neutral-200 shadow-sm',
  flat: 'bg-neutral-50 border border-neutral-100',
  outline: 'bg-transparent border border-neutral-200',
  ghost: 'bg-transparent border-0',
  none: 'bg-transparent border-0',
};

const CardRoot: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  noPadding = false,
  style,
  ...props
}) => {
  return (
    <View
      style={style}
      className={`rounded-2xl ${variantStyles[variant] || variantStyles.default} ${noPadding ? '' : 'p-4'
        } ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  action,
  style,
  ...props
}) => {
  return (
    <View
      style={style}
      className={`flex-row items-center justify-between gap-3 pb-3 border-b border-neutral-100 ${className}`}
      {...props}
    >
      <View className="flex-1">{children}</View>
      {action ? <View className="shrink-0">{action}</View> : null}
    </View>
  );
};

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '', style }) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Text
        style={style}
        className={`text-sm font-bold tracking-tight text-neutral-900 ${className}`}
      >
        {children}
      </Text>
    );
  }
  return <>{children}</>;
};

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '', style }) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Text
        style={style}
        className={`text-xs text-neutral-500 leading-relaxed mt-0.5 ${className}`}
      >
        {children}
      </Text>
    );
  }
  return <>{children}</>;
};

const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  noPadding = false,
  style,
  ...props
}) => {
  return (
    <View style={style} className={`${noPadding ? '' : 'py-3'} ${className}`} {...props}>
      {children}
    </View>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <View
      style={style}
      className={`flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-100 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Content: CardBody,
  Footer: CardFooter,
});

export default Card;
