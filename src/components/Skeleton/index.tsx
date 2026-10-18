import React, { useEffect } from 'react';
import { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 120,
  height = 20,
  borderRadius = 8,
  className = '',
  style,
  animate = true,
}) => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    if (animate) {
      opacity.value = withRepeat(
        withTiming(0.85, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      opacity.value = 0.5;
    }
  }, [animate]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height: height as any,
          borderRadius,
        },
        animate ? animatedStyle : { opacity: 0.5 },
        style,
      ]}
      className={`bg-slate-200 ${className}`}
    />
  );
};

export default Skeleton;