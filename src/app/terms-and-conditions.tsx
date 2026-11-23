import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import { appNavigation } from "@/utils";
import React from "react";
import { View } from "react-native";

const TermsAndConditionsScreen: React.FC = () => {
    return (
        <ScreenProvider
            header={<CustomHeader title="Terms & Conditions" onBackPress={appNavigation.goBack} />}
            scrollable
            contentContainerClassName="flex-grow px-5 py-4"
        >
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Acceptance of Terms
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    By downloading, accessing, or using the ChargeCheckout mobile
                    application, you agree to be bound by these Terms & Conditions.
                    If you do not agree with any part of these terms, please do not
                    use the app.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Eligibility
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    You must be at least 18 years old and capable of entering into a
                    legally binding agreement to use ChargeCheckout. By using the
                    app, you represent and warrant that you meet these requirements.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                    Use of the Service
                </Text>
                <View className="gap-2">
                    <Text className="text-sm text-gray-600">• Use the app only for lawful EV charging purposes</Text>
                    <Text className="text-sm text-gray-600">• Provide accurate account and payment information</Text>
                    <Text className="text-sm text-gray-600">• Do not attempt to reverse-engineer or tamper with the app</Text>
                    <Text className="text-sm text-gray-600">• Do not misuse charging stations or other users' accounts</Text>
                    <Text className="text-sm text-gray-600">• Comply with all applicable laws and regulations</Text>
                </View>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Account Registration
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    You are responsible for maintaining the confidentiality of your
                    account credentials and for all activities that occur under your
                    account. Notify us immediately of any unauthorized use. We reserve
                    the right to suspend or terminate accounts that violate these terms.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Charging Services
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    ChargeCheckout provides a platform to locate and pay for EV
                    charging sessions. Actual charging services are provided by
                    third-party charging station operators. We do not guarantee
                    charger availability, uptime, or charging speed. Prices are set
                    by station operators and displayed in the app before you start
                    a session.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Payments & Billing
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    All payments are processed securely through third-party payment
                    providers. By providing payment information, you authorize us to
                    charge the applicable fees for charging sessions. All fees are
                    displayed before confirmation and are non-refundable except where
                    required by law.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Refunds & Cancellations
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    Refund requests for failed or interrupted charging sessions must
                    be submitted through the Contact Support section within 7 days of
                    the transaction. Refunds are subject to review and approval by
                    the charging station operator.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Intellectual Property
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    All content, logos, trademarks, and software associated with
                    ChargeCheckout are the property of ChargeCheckout Technologies
                    and are protected by intellectual property laws. You may not
                    copy, modify, or distribute any part of the app without prior
                    written consent.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Limitation of Liability
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    To the maximum extent permitted by law, ChargeCheckout shall not
                    be liable for any indirect, incidental, special, or consequential
                    damages arising from your use of the app, including but not
                    limited to charging delays, equipment failures, or data loss.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Termination
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    We reserve the right to suspend or terminate your access to the
                    app at any time, without prior notice, if you violate these
                    terms or engage in fraudulent or harmful behavior.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Changes to Terms
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    We may update these Terms & Conditions from time to time. Changes
                    will be posted in the app with an updated "Last updated" date.
                    Continued use of the app after changes constitutes acceptance of
                    the revised terms.
                </Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Contact Us
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                    If you have questions about these Terms & Conditions, please
                    contact us through the app's Contact Support section.
                </Text>
            </View>
        </ScreenProvider>
    );
};

export default TermsAndConditionsScreen;