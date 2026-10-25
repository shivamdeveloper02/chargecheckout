import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';

export type TextWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export interface TextProps extends RNTextProps {
  weight?: TextWeight;
  className?: string;
}

const weightMap: Record<TextWeight, { fontFamily: string; fontWeight: TextStyle['fontWeight'] }> = {
  thin: { fontFamily: 'Poppins-Thin', fontWeight: '100' },
  extralight: { fontFamily: 'Poppins-ExtraLight', fontWeight: '200' },
  light: { fontFamily: 'Poppins-Light', fontWeight: '300' },
  normal: { fontFamily: 'Poppins-Regular', fontWeight: '400' },
  regular: { fontFamily: 'Poppins-Regular', fontWeight: '400' },
  medium: { fontFamily: 'Poppins-Medium', fontWeight: '500' },
  semibold: { fontFamily: 'Poppins-SemiBold', fontWeight: '600' },
  bold: { fontFamily: 'Poppins-Bold', fontWeight: '700' },
  extrabold: { fontFamily: 'Poppins-ExtraBold', fontWeight: '800' },
  black: { fontFamily: 'Poppins-Black', fontWeight: '900' },
};

const resolveWeightFromStyle = (style: any): { fontFamily: string; fontWeight?: TextStyle['fontWeight'] } => {
  const flattened = StyleSheet.flatten(style);
  if (!flattened) return { fontFamily: 'Poppins-Regular' };

  if (flattened.fontFamily && flattened.fontFamily.startsWith('Poppins')) {
    return { fontFamily: flattened.fontFamily };
  }

  const fw = String(flattened.fontWeight || '');
  switch (fw) {
    case '100':
      return { fontFamily: 'Poppins-Thin', fontWeight: '100' };
    case '200':
      return { fontFamily: 'Poppins-ExtraLight', fontWeight: '200' };
    case '300':
      return { fontFamily: 'Poppins-Light', fontWeight: '300' };
    case '500':
      return { fontFamily: 'Poppins-Medium', fontWeight: '500' };
    case '600':
      return { fontFamily: 'Poppins-SemiBold', fontWeight: '600' };
    case '700':
    case 'bold':
      return { fontFamily: 'Poppins-Bold', fontWeight: '700' };
    case '800':
      return { fontFamily: 'Poppins-ExtraBold', fontWeight: '800' };
    case '900':
      return { fontFamily: 'Poppins-Black', fontWeight: '900' };
    default:
      return { fontFamily: 'Poppins-Regular', fontWeight: '400' };
  }
};

const Text = forwardRef<RNText, TextProps>(({ style, weight, className, children, ...rest }, ref) => {
  const explicitWeight = weight ? weightMap[weight] : null;
  const resolved = explicitWeight || resolveWeightFromStyle(style);

  return (
    <RNText
      ref={ref}
      style={[{ fontFamily: resolved.fontFamily }, style]}
      className={className}
      {...rest}
    >
      {children}
    </RNText>
  );
});

Text.displayName = 'Text';

export default Text;
