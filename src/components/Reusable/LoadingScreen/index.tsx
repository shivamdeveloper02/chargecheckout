import { BrandColors } from '@/constants/theme';
import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, type ViewStyle } from 'react-native';
import Text from '../Text';

export interface LoadingScreenProps {
    message?: string;
    visible?: boolean;
    overlay?: boolean;
    style?: ViewStyle;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = 'Loading...',
    visible = true,
    overlay = true,
    style,
}) => {
    const translateX = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (!visible) return;
        translateX.setValue(-100);
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 200,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -100,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();

        return () => animation.stop();
    }, [translateX, visible]);

    if (!visible) {
        return null;
    }

    return (
        <View className={`flex-1 items-center justify-center bg-white ${overlay ? 'absolute inset-0 z-50' : ''}`} style={style}>
            <Image
                source={require('@/assets/images/chargecheckout-logo.png')}
                style={{ width: 160, height: 120 }}
                contentFit="contain"
                priority="high"
            />
            <View className="h-1.5 w-[200px] overflow-hidden rounded-full bg-gray-200">
                <Animated.View
                    className="h-full w-[100px] rounded-full"
                    style={{
                        backgroundColor: BrandColors.primary.DEFAULT,
                        transform: [{ translateX }],
                    }}
                />
            </View>
            <Text weight="medium" className="mt-4 text-sm text-gray-500">
                {message}
            </Text>
        </View>
    );
};

export default LoadingScreen;