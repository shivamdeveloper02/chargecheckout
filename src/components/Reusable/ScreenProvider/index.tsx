import type { ScreenProviderProps } from '@/types';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../CustomHeader';
import LoadingScreen from '../LoadingScreen';

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
    showHeader,
    header,
    headerProps,
    title,
    subtitle,
    onBackPress,
    rightComponent,
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

    const shouldRenderHeader =
        showHeader === true ||
        (showHeader !== false &&
            (header !== undefined ||
                headerProps !== undefined ||
                title !== undefined ||
                subtitle !== undefined));

    const headerElement =
        header !== undefined ? (
            header
        ) : shouldRenderHeader ? (
            <CustomHeader
                title={title}
                subtitle={subtitle}
                onBackPress={onBackPress}
                rightComponent={rightComponent}
                {...headerProps}
            />
        ) : null;

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
                        {headerElement}
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