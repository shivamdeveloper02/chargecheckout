import React, { useEffect, useState } from 'react';
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
import LoadingScreen from '../LoadingScreen';

interface ScreenProviderProps {
    children: React.ReactNode;
    statusBarStyle?: StatusBarStyle;
    statusBarBackgroundColor?: string;
    hiddenStatusBar?: boolean;
    translucentStatusBar?: boolean;
    safeArea?: boolean;
    edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
    keyboardAvoiding?: boolean;
    keyboardVerticalOffset?: number;
    dismissKeyboardOnPress?: boolean;
    scrollable?: boolean;
    bounces?: boolean;
    className?: string;
    contentContainerClassName?: string;
    backgroundColor?: string;
    style?: ViewStyle;
    isLoading?: boolean;
    loadingMessage?: string;
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
    keyboardVerticalOffset = 0,
    dismissKeyboardOnPress = true,
    scrollable = false,
    bounces = false,
    className = 'flex-1 bg-white',
    contentContainerClassName = 'flex-grow',
    backgroundColor = '#FFFFFF',
    style,
    isLoading = false,
    loadingMessage,
}) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
        const showSubscription = Keyboard.addListener(showEvent, () => {
            setIsKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            setIsKeyboardVisible(false);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const Container = safeArea ? SafeAreaView : View;

    const content = (
        <Pressable
            className="flex-1"
            disabled={!dismissKeyboardOnPress || !isKeyboardVisible}
            onPress={Keyboard.dismiss}
            accessible={false}
        >
            {children}
        </Pressable>
    );

    return (
        <View className="flex-1" style={{ backgroundColor: isLoading ? '#FFFFFF' : backgroundColor }}>
            <StatusBar
                barStyle={isLoading ? 'dark-content' : statusBarStyle}
                backgroundColor={isLoading ? '#FFFFFF' : statusBarBackgroundColor}
                hidden={hiddenStatusBar}
                translucent={translucentStatusBar}
            />

            <Container
                {...(safeArea ? { edges } : {})}
                className={className}
                style={style}
            >
                {isLoading ? (
                    <LoadingScreen message={loadingMessage} />
                ) : (
                    <KeyboardAvoidingView
                        className="flex-1"
                        behavior={
                            keyboardAvoiding
                                ? Platform.OS === 'ios'
                                    ? 'padding'
                                    : isKeyboardVisible
                                        ? 'padding'
                                        : undefined
                                : undefined
                        }
                        enabled={keyboardAvoiding}
                        keyboardVerticalOffset={keyboardVerticalOffset}
                    >
                        {scrollable ? (
                            <ScrollView
                                className="flex-1"
                                contentContainerClassName={contentContainerClassName}
                                keyboardShouldPersistTaps="handled"
                                keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
                                showsVerticalScrollIndicator={false}
                                bounces={bounces}
                            >
                                {content}
                            </ScrollView>
                        ) : (
                            content
                        )}
                    </KeyboardAvoidingView>
                )}
            </Container>
        </View>
    );
};

export default ScreenProvider;