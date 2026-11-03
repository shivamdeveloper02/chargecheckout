import { Button, Icon, toast } from "@/components";
import { Input } from "@/components/Forms";
import { CustomHeader, ImagePicker, ScreenProvider } from "@/components/Reusable";
import type { EditProfileErrors, EditProfileFormData, EditProfileTextField, PickedImage } from "@/types";
import { EMAIL_REGEX, goBack, PHONE_REGEX } from "@/utils";
import React, { useState } from "react";
import { View } from "react-native";

// TODO: Replace with the profile returned by your API / store.
const INITIAL_PROFILE: EditProfileFormData = {
    fullName: "Shivam Pandey",
    mobile: "9555804662",
    email: "shivam.developer02@gmail.com",
    image: "https://coox-new.s3.ap-south-1.amazonaws.com/images/user/754921/profile-img892a178e-f99c-4af7-af35-a7b76b7a2744.jpeg?v=1786087052411",
};

const validate = (data: EditProfileFormData): EditProfileErrors => {
    const errors: EditProfileErrors = {};
    const name = data.fullName.trim();
    const mobile = data.mobile.trim();
    const email = data.email.trim();
    if (!name) errors.fullName = "Full name is required";
    else if (name.length < 3) errors.fullName = "Name must contain at least 3 characters";
    if (!mobile) errors.mobile = "Mobile number is required";
    else if (!PHONE_REGEX.test(mobile)) errors.mobile = "Enter a valid 10-digit mobile number";
    if (!email) errors.email = "Email address is required";
    else if (!EMAIL_REGEX.test(email)) errors.email = "Please enter a valid email address";
    return errors;
};

const EditProfileScreen: React.FC = () => {
    const [formData, setFormData] = useState<EditProfileFormData>(INITIAL_PROFILE);
    const [errors, setErrors] = useState<EditProfileErrors>({});
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const handleChange = (field: EditProfileTextField, value: string) => {
        const nextValue = field === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;
        setFormData((previous) => ({ ...previous, [field]: nextValue }));
        setErrors((previous) => ({ ...previous, [field]: undefined }));
    };

    const handleImageChange = (image: PickedImage | null) => {
        setFormData((previous) => ({ ...previous, image: image?.uri ?? null }));
    };

    const handleSave = async () => {
        if (isSaving) return;
        const nextErrors = validate(formData);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;
        setIsSaving(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            toast.success("Your profile has been updated", "Profile saved");
            goBack();
        } catch {
            toast.error("Unable to update your profile. Please try again.", "Update failed");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ScreenProvider
            header={<CustomHeader title="Edit Profile" />}
            contentContainerClassName="flex-grow"
            scrollable
        >
            <View className="flex-1 px-5 pb-6 pt-6">
                <View className="items-center">
                    <ImagePicker
                        variant="circle"
                        size={150}
                        source={formData.image}
                        borderWidth={2}
                        borderColor="#004586"
                        editable
                        allowRemove
                        onImageChange={handleImageChange}
                    />
                </View>
                <View className="mt-8 gap-4">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        autoCapitalize="words"
                        autoComplete="name"
                        value={formData.fullName}
                        onChangeText={(value) => handleChange("fullName", value)}
                        error={errors.fullName}
                        leftIcon={<Icon name="person-outline" size={18} color="#94A3B8" />}
                        required
                    />
                    <Input
                        label="Mobile Number"
                        placeholder="Enter 10-digit mobile number"
                        keyboardType="number-pad"
                        autoComplete="tel-national"
                        value={formData.mobile}
                        onChangeText={(value) => handleChange("mobile", value)}
                        error={errors.mobile}
                        leftIcon={<Icon name="call-outline" size={18} color="#94A3B8" />}
                        required
                    />
                    <Input
                        label="Email Address"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoComplete="email"
                        value={formData.email}
                        onChangeText={(value) => handleChange("email", value)}
                        error={errors.email}
                        leftIcon={<Icon name="mail-outline" size={18} color="#94A3B8" />}
                        required
                    />
                </View>
                <View className="mt-8 gap-3">
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={isSaving}
                        onPress={handleSave}
                    >
                        {isSaving ? "Updating..." : "Update"}
                    </Button>
                    <Button
                        variant="border"
                        size="lg"
                        fullWidth
                        disabled={isSaving}
                        onPress={() => goBack()}
                    >
                        Cancel
                    </Button>
                </View>
            </View>
        </ScreenProvider>
    );
};

export default EditProfileScreen;
