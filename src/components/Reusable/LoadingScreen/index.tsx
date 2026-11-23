import { BrandColors } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import Text from '../Text';
interface LoadingScreenProps {
    message?: string;
    visible?: boolean;
}
const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = 'Loading...',
    visible = true,
}) => {
    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
            onRequestClose={() => { }}
        >
            <View className="flex-1 items-center justify-center bg-black/30">
                <View className="mx-6 w-5/6 flex-row items-center justify-center rounded-2xl border border-gray-100 bg-white p-5">
                    <ActivityIndicator size="large" color={BrandColors.primary.DEFAULT} />
                    <View className="ml-4 flex-1 justify-center">
                        <Text weight="semibold" className="text-lg text-gray-800">
                            Please wait
                        </Text>
                        <Text weight="medium" className="mt-1 text-sm text-gray-500">
                            {message}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default LoadingScreen;