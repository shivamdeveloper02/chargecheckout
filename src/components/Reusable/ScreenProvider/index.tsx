import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    View,
    type StatusBarStyle,
    type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProviderProps {
    children: React.ReactNode;
    statusBarStyle?: StatusBarStyle;
    statusBarBackgroundColor?: string;
    hiddenStatusBar?: boolean;
    translucentStatusBar?: boolean;
    safeArea?: boolean;
    edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
    keyboardAvoiding?: boolean;
    dismissKeyboardOnPress?: boolean;
    scrollable?: boolean;
    className?: string;
    contentContainerClassName?: string;
    backgroundColor?: string;
    style?: ViewStyle;
}

const ScreenProvider: React.FC<ScreenProviderProps> = ({
    children,
    statusBarStyle = 'dark-content',
    statusBarBackgroundColor = '#FFFFFF',
    hiddenStatusBar = false,
    translucentStatusBar = false,
    safeArea = true,
    edges = ['top', 'bottom'],
    keyboardAvoiding = true,
    dismissKeyboardOnPress = true,
    scrollable = false,
    className = 'flex-1 bg-white px-5',
    contentContainerClassName = 'flex-grow',
    backgroundColor = '#FFFFFF',
    style,
}) => {
    const Container = safeArea ? SafeAreaView : View;

    return (
        <View className="flex-1" style={{ backgroundColor }}>
            <StatusBar
                barStyle={statusBarStyle}
                backgroundColor={statusBarBackgroundColor}
                hidden={hiddenStatusBar}
                translucent={translucentStatusBar}
            />

            <Container
                {...(safeArea ? { edges } : {})}
                className={className}
                style={style}
            >
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={
                        keyboardAvoiding && Platform.OS === 'ios'
                            ? 'padding'
                            : undefined
                    }
                    enabled={keyboardAvoiding}
                >
                    {scrollable ? (
                        <ScrollView
                            className="flex-1"
                            contentContainerClassName={contentContainerClassName}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
                        >
                            {children}
                        </ScrollView>
                    ) : (
                        children
                    )}

                    {dismissKeyboardOnPress && !scrollable && (
                        <Pressable
                            onPress={Keyboard.dismiss}
                            className="absolute bottom-0 right-0 h-0 w-0"
                            accessible={false}
                        />
                    )}
                </KeyboardAvoidingView>
            </Container>
        </View>
    );
};

export default ScreenProvider;