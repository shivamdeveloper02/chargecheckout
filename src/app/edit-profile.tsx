import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import React from "react";
import { View } from "react-native";

const EditProfileScreen: React.FC = () => {
    return (
        <ScreenProvider
            header={<CustomHeader title="Edit Profile" />}
        >
            <View className="flex-1 px-4 pt-4">
                <Text>
                    Edit Profile Screen
                </Text >
            </View >
        </ScreenProvider >
    );
};

export default EditProfileScreen;