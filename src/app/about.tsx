import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import { appNavigation } from "@/utils";
import { Image } from "expo-image";
import React from "react";
import { Pressable, View } from "react-native";

const APP_VERSION = "1.0.0";

const AboutScreen: React.FC = () => {
    return (
        <ScreenProvider
            header={<CustomHeader title="About" onBackPress={appNavigation.goBack} />}
            scrollable
            contentContainerClassName="flex-grow px-5 py-4"
        >
            <View className="items-center mb-8">
                <Image
                    source={require('@/assets/images/chargecheckout-logo.png')}
                    style={{ width: 120, height: 70 }}
                    contentFit="contain"
                    priority="high"
                />
                <Text className="text-2xl text-secondary" weight="medium">
                    ChargeCheckout
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                    Version {APP_VERSION}
                </Text>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    About the App
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    ChargeCheckout is your reliable companion for electric vehicle
                    charging. Find nearby charging stations, start and stop charging
                    sessions, and pay seamlessly — all from one app. We're committed
                    to making EV charging simple, fast, and accessible for everyone.
                </Text>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                    Key Features
                </Text>
                <View className="gap-2">
                    <Text className="text-sm text-gray-600">• Locate nearby EV charging stations</Text>
                    <Text className="text-sm text-gray-600">• Real-time charger availability</Text>
                    <Text className="text-sm text-gray-600">• Seamless session start & stop</Text>
                    <Text className="text-sm text-gray-600">• Secure in-app payments</Text>
                    <Text className="text-sm text-gray-600">• Charging history & receipts</Text>
                </View>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                    How It Works
                </Text>
                <View className="gap-3">
                    <View>
                        <Text className="text-sm font-semibold text-gray-800">1. Find a Charger</Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            Browse the map or search by location to find available
                            charging stations near you.
                        </Text>
                    </View>
                    <View>
                        <Text className="text-sm font-semibold text-gray-800">2. Start Charging</Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            Scan the QR code or select the connector to begin your
                            charging session instantly.
                        </Text>
                    </View>
                    <View>
                        <Text className="text-sm font-semibold text-gray-800">3. Pay & Go</Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            Pay securely in-app and receive a digital receipt in your
                            charging history.
                        </Text>
                    </View>
                </View>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                    Supported Charging Standards
                </Text>
                <View className="gap-2">
                    <Text className="text-sm text-gray-600">• Type 2 (AC)</Text>
                    <Text className="text-sm text-gray-600">• CCS2 (DC Fast Charging)</Text>
                    <Text className="text-sm text-gray-600">• CHAdeMO</Text>
                    <Text className="text-sm text-gray-600">• GB/T</Text>
                </View>
            </View>
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                    Why Choose ChargeCheckout?
                </Text>
                <View className="gap-2">
                    <Text className="text-sm text-gray-600">• Wide network of verified charging stations</Text>
                    <Text className="text-sm text-gray-600">• Transparent pricing with no hidden fees</Text>
                    <Text className="text-sm text-gray-600">• 24/7 customer support</Text>
                    <Text className="text-sm text-gray-600">• Secure payments with encrypted transactions</Text>
                    <Text className="text-sm text-gray-600">• Regular app updates and new features</Text>
                </View>
            </View>
            <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Legal & Support
                </Text>
                <Pressable
                    className="py-2"
                    onPress={appNavigation.toPrivacyPolicy}
                >
                    <Text className="text-sm text-blue-600">Privacy Policy</Text>
                </Pressable>
                <Pressable
                    className="py-2"
                    onPress={appNavigation.toTermsAndConditions}
                >
                    <Text className="text-sm text-blue-600">Terms of Service</Text>
                </Pressable>
                <Pressable
                    className="py-2"
                    onPress={appNavigation.toContactUs}
                >
                    <Text className="text-sm text-blue-600">Contact Support</Text>
                </Pressable>
            </View>
        </ScreenProvider>
    );
};

export default AboutScreen;