import { ScreenProvider, Text } from '@/components/Reusable';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const Splash: React.FC = () => {
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
        const timer = setTimeout(() => {
            router.replace('/login');
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    return (
        <ScreenProvider scrollable={false}>
            <Animated.View style={animatedStyle} className="flex-1 items-center justify-center">
                <Image
                    source={require('@/assets/images/chargecheckout-logo.png')}
                    style={{ width: 160, height: 120 }}
                    contentFit="contain"
                    priority="high"
                />
                <View className="flex-row items-center pb-2">
                    <Text className="text-4xl text-secondary tracking-wider">
                        Charge
                    </Text>
                    <Text className="text-4xl text-primary tracking-wider">
                        Checkout
                    </Text>
                </View>
                <Text className="text-slate-500 text-sm tracking-wider text-center">
                    Powering Next-Gen EV Charging Operations
                </Text>
                <View className="mt-8">
                    <ActivityIndicator size="large" color="#00D06C" />
                </View>
            </Animated.View>
        </ScreenProvider>
    );
}

export default Splash;