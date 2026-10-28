import { Button, Icon } from '@/components';
import { Input } from '@/components/Forms';
import { ScreenProvider, Text } from '@/components/Reusable';
import { EMAIL_REGEX, PHONE_REGEX } from '@/utils';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

interface FormData {
    name: string;
    mobile: string;
    email: string;
    password: string;
}

type FormField = keyof FormData;

const initialFormData: FormData = {
    name: '',
    mobile: '',
    email: '',
    password: '',
};

const SignUpScreen: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        const name = formData.name.trim();
        const mobile = formData.mobile.trim();
        const email = formData.email.trim();
        if (!name) {
            newErrors.name = 'Full name is required';
        } else if (name.length < 2) {
            newErrors.name = 'Name must contain at least 2 characters';
        }
        if (!mobile) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!PHONE_REGEX.test(mobile)) {
            newErrors.mobile = 'Enter a valid 10-digit mobile number';
        }
        if (!email) {
            newErrors.email = 'Email address is required';
        } else if (!EMAIL_REGEX.test(email.trim())) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: FormField, value: string) => {
        const updatedValue =
            field === 'mobile'
                ? value.replace(/\D/g, '').slice(0, 10)
                : value;

        setFormData((previous) => ({
            ...previous,
            [field]: updatedValue,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));
    };

    const handleSignUp = async () => {
        if (isLoading || !validate()) return;

        setIsLoading(true);

        try {
            // TODO: Call your registration API here.
            // Navigate only after successful registration.
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScreenProvider
            className="flex-1 bg-white px-5"
            contentContainerClassName="flex-grow"
            keyboardAvoiding
        >
            <View className="flex-grow justify-center py-6">
                <View className="items-center">
                    <Image
                        source={require('@/assets/images/chargecheckout-logo.png')}
                        style={{ width: 140, height: 95 }}
                        contentFit="contain"
                        priority="high"
                    />

                    <View className="mt-2 flex-row items-center">
                        <Text className="text-3xl tracking-wider text-secondary">
                            Charge
                        </Text>
                        <Text className="text-3xl tracking-wider text-primary">
                            Checkout
                        </Text>
                    </View>
                    <Text className="mt-2 text-center text-sm leading-5 text-slate-500">
                        Create your account to manage EV charging & checkout
                    </Text>
                </View>
                <View className="mt-8 gap-4">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        autoCapitalize="words"
                        autoComplete="name"
                        value={formData.name}
                        onChangeText={(value) => handleChange('name', value)}
                        error={errors.name}
                        leftIcon={
                            <Icon
                                name="person-outline"
                                size={18}
                                color="#94A3B8"
                            />
                        }
                        required
                    />
                    <Input
                        label="Mobile Number"
                        placeholder="Enter 10-digit mobile number"
                        keyboardType="number-pad"
                        autoComplete="tel-national"
                        value={formData.mobile}
                        onChangeText={(value) => handleChange('mobile', value)}
                        error={errors.mobile}
                        leftIcon={
                            <Icon
                                name="call-outline"
                                size={18}
                                color="#94A3B8"
                            />
                        }
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
                        onChangeText={(value) => handleChange('email', value)}
                        error={errors.email}
                        leftIcon={
                            <Icon
                                name="mail-outline"
                                size={18}
                                color="#94A3B8"
                            />
                        }
                        required
                    />

                    <Input
                        label="Password"
                        placeholder="Create a password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="new-password"
                        value={formData.password}
                        onChangeText={(value) => handleChange('password', value)}
                        error={errors.password}
                        leftIcon={
                            <Icon
                                name="lock-closed-outline"
                                size={18}
                                color="#94A3B8"
                            />
                        }
                        required
                    />

                    <Text className="text-xs leading-5 text-slate-500">
                        Password must contain at least 8 characters.
                    </Text>

                    <View className="mt-2">
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={isLoading}
                            onPress={handleSignUp}
                        >
                            Sign Up
                        </Button>
                    </View>

                    {/* Login link */}
                    <View className="mt-2 flex-row flex-wrap items-center justify-center">
                        <Text className="text-sm text-slate-500">
                            Already have an account?{' '}
                        </Text>

                        <Pressable
                            onPress={() => router.replace('/login')}
                            hitSlop={8}
                        >
                            <Text className="text-sm font-semibold text-[#0A3D91]">
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenProvider>
    );
};

export default SignUpScreen;