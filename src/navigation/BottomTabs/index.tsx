import { Text } from '@/components/Reusable';
import { BrandColors, Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BottomTabsProps {
    state: {
        index: number;
        routes: Array<{
            key: string;
            name: string;
            params?: Record<string, unknown>;
        }>;
    };
    descriptors: Record<
        string,
        {
            options: {
                title?: string;
                tabBarLabel?: string;
                tabBarIcon?: (props: {
                    focused: boolean;
                    color: string;
                    size: number;
                }) => React.ReactNode;
                tabBarBadge?: string | number;
            };
        }
    >;
    navigation: {
        emit: (event: {
            type: string;
            target: string;
            canPreventDefault: boolean;
        }) => { defaultPrevented: boolean };
        navigate: (name: string, params?: Record<string, unknown>) => void;
    };
}

interface TabConfig {
    name: string;
    label: string;
    activeIcon: keyof typeof Ionicons.glyphMap;
    inactiveIcon: keyof typeof Ionicons.glyphMap;
}

const TAB_CONFIGS: Record<string, TabConfig> = {
    index: {
        name: 'index',
        label: 'Map',
        activeIcon: 'navigate',
        inactiveIcon: 'navigate-outline',
    },
    charger: {
        name: 'charger',
        label: 'Charger',
        activeIcon: 'flash',
        inactiveIcon: 'flash-outline',
    },
    wallet: {
        name: 'wallet',
        label: 'Wallet',
        activeIcon: 'wallet',
        inactiveIcon: 'wallet-outline',
    },
    profile: {
        name: 'profile',
        label: 'Profile',
        activeIcon: 'person',
        inactiveIcon: 'person-outline',
    },
};

const TabItem: React.FC<{
    isFocused: boolean;
    routeName: string;
    onPress: () => void;
    onLongPress: () => void;
}> = ({ isFocused, routeName, onPress, onLongPress }) => {
    const config = TAB_CONFIGS[routeName] || {
        name: routeName,
        label: routeName,
        activeIcon: 'ellipse' as const,
        inactiveIcon: 'ellipse-outline' as const,
    };
    const scale = useSharedValue(1);
    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    const handlePressIn = () => {
        scale.value = withSpring(0.92, { damping: 12, stiffness: 220 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 12, stiffness: 220 });
    };

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={config.label}
            className="flex-1 items-center justify-center h-full"
        >
            <Animated.View
                style={animatedButtonStyle}
                className="items-center justify-center px-4 py-2"
            >
                <Ionicons
                    name={isFocused ? config.activeIcon : config.inactiveIcon}
                    size={24}
                    color={isFocused ? BrandColors.primary.DEFAULT : BrandColors.primary.subtle}
                />
                <Animated.View
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                    style={{ marginTop: 2 }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            fontFamily: Fonts?.medium,
                            fontSize: 11,
                            color: isFocused ? BrandColors.primary.DEFAULT : BrandColors.primary.subtle,
                            letterSpacing: -0.2,
                        }}
                    >
                        {config.label}
                    </Text>
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
};

export const BottomTabs: React.FC<BottomTabsProps> = ({ state, navigation }) => {
    const insets = useSafeAreaInsets();

    const orderedRoutes = ['index', 'charger', 'wallet', 'profile'];
    const routesToRender = orderedRoutes
        .map((name) => state.routes.find((r) => r.name === name))
        .filter((r): r is NonNullable<typeof r> => Boolean(r));

    state.routes.forEach((r) => {
        if (!routesToRender.some((existing) => existing.name === r.name)) {
            routesToRender.push(r);
        }
    });

    return (
        <View className={`absolute bottom-0 left-0 right-0 ${insets.bottom > 0 ? insets.bottom : 8} bg-secondary`}>
            <View className="flex-row items-center justify-between p-2 h-24">
                {routesToRender.map((route) => {
                    const originalIndex = state.routes.findIndex(
                        (r) => r.key === route.key
                    );
                    const isFocused = state.index === originalIndex;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };
                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                            canPreventDefault: false,
                        });
                    };
                    return (
                        <TabItem
                            key={route.key}
                            routeName={route.name}
                            isFocused={isFocused}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default BottomTabs;