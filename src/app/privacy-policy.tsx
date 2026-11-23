import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import { appNavigation } from "@/utils";
import React from "react";
import { View } from "react-native";

const PrivacyPolicyScreen: React.FC = () => {
    return (
        <ScreenProvider
            header={<CustomHeader title="Privacy Policy" onBackPress={appNavigation.goBack} />}
            scrollable
            contentContainerClassName="flex-grow px-5 py-4"
        >
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Introduction
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    ChargeCheckout ("we", "our", or "us") is committed to protecting
                    your privacy. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our mobile
                    application. By using ChargeCheckout, you agree to the collection
                    and use of information in accordance with this policy.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                    Information We Collect
                </Text>
                <View className="gap-3">
                    <View>
                        <Text className="text-sm font-semibold text-gray-800">Personal Information</Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            Name, email address, phone number, and payment details
                            provided during account registration and checkout.
                        </Text>
                    </View>
                    <View>
                        <Text className="text-sm font-semibold text-gray-800">Location Data</Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            Approximate or precise location to help you find nearby
                            charging stations. You can disable location access in
                            your device settings at any time.
                        </Text>
                    </View>
                    <View>
                        <Text className="text-sm font-semibold text-gray-800">Usage Data</Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            Charging session history, transaction records, app
                            interactions, device information, and crash logs.
                        </Text>
                    </View>
                </View>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    How We Use Your Information
                </Text>
                <View className="gap-2">
                    <Text className="text-sm text-gray-600">• To provide and maintain our charging services</Text>
                    <Text className="text-sm text-gray-600">• To process payments and issue receipts</Text>
                    <Text className="text-sm text-gray-600">• To locate nearby charging stations</Text>
                    <Text className="text-sm text-gray-600">• To communicate service updates and support</Text>
                    <Text className="text-sm text-gray-600">• To improve app performance and user experience</Text>
                    <Text className="text-sm text-gray-600">• To comply with legal and regulatory obligations</Text>
                </View>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Sharing Your Information
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    We do not sell your personal information. We may share data with
                    trusted third parties who assist us in operating our app,
                    conducting our business, or servicing you — including payment
                    processors, charging station operators, and analytics providers.
                    These parties are obligated to keep your information confidential.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Data Security
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    We use industry-standard encryption and security measures to
                    protect your personal information. However, no method of
                    transmission over the internet or electronic storage is 100%
                    secure, and we cannot guarantee absolute security.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Data Retention
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    We retain your personal information only for as long as necessary
                    to fulfill the purposes outlined in this policy, comply with
                    legal obligations, resolve disputes, and enforce our agreements.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Your Rights
                </Text>
                <View className="gap-2">
                    <Text className="text-sm text-gray-600">• Access and review your personal data</Text>
                    <Text className="text-sm text-gray-600">• Request correction of inaccurate data</Text>
                    <Text className="text-sm text-gray-600">• Request deletion of your account and data</Text>
                    <Text className="text-sm text-gray-600">• Withdraw consent for location tracking</Text>
                    <Text className="text-sm text-gray-600">• Opt out of marketing communications</Text>
                </View>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Children's Privacy
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    ChargeCheckout is not intended for use by individuals under the
                    age of 18. We do not knowingly collect personal information from
                    children. If you believe we have collected such information,
                    please contact us so we can delete it.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Changes to This Policy
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new policy in the app
                    and updating the "Last updated" date. Continued use of the app
                    after changes constitutes acceptance of the updated policy.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Contact Us
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    If you have questions or concerns about this Privacy Policy or
                    our data practices, please contact us through the app's Contact
                    Support section.
                </Text>
            </View>
        </ScreenProvider>
    );
};

export default PrivacyPolicyScreen;