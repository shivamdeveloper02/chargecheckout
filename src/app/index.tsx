import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreenComponent() {
  const logoScale = useSharedValue(0.9);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    // Hide the native splash screen as our component mounts
    const prepare = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch {
        // Ignored
      }
    };
    prepare();

    logoOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    logoScale.value = withSpring(1, { damping: 15, stiffness: 120 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-between py-12 px-6">
      <View className="h-6" />
      <Animated.View style={animatedStyle} className="flex-1 items-center justify-center">
        <Image
          source={require('@/assets/images/chargecheckout-logo.png')}
          style={{ width: 160, height: 120 }}
          contentFit="contain"
          priority="high"
        />
        <View className="flex-row items-center">
          <Text className="text-4xl font-extrabold tracking-tight text-secondary">
            Charge
          </Text>
          <Text className="text-4xl font-extrabold tracking-tight text-primary">
            Checkout
          </Text>
        </View>
        <Text className="text-slate-500 text-sm mt-1.5 font-medium tracking-wide text-center">
          Powering Next-Gen EV Charging Operations
        </Text>
        <View className="mt-8">
          <ActivityIndicator size="large" color="#00D06C" />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
