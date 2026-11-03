import { CustomHeader, CustomImage, ScreenProvider } from "@/components/Reusable";
import { type PickedImage } from "@/utils/permission-function";
import React, { useState } from "react";
import { View } from "react-native";

const EditProfileScreen: React.FC = () => {
    const [avatar, setAvatar] = useState<PickedImage | null>(null);

    return (
        <ScreenProvider
            header={<CustomHeader title="Edit Profile" />}
        >
            <View className="flex-1 items-center px-4 pt-6">
                <CustomImage
                    variant="circle"
                    size={110}
                    source={avatar?.uri}
                    borderWidth={2}
                    borderColor="#004586"
                    editable
                    allowRemove
                    onImageChange={setAvatar}
                />
            </View>
        </ScreenProvider>
    );
};

export default EditProfileScreen;