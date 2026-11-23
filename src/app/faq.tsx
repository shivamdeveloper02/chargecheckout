import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import { appNavigation } from "@/utils";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

type FAQItem = {
    question: string;
    answer: string;
};

const FAQ_DATA: FAQItem[] = [
    {
        question: "How do I find a charging station near me?",
        answer:
            "Open the app and go to the map or search screen. Your current location will be used to show nearby charging stations. You can also search by address or station name, and filter by connector type, power level, or availability.",
    },
    {
        question: "How do I start a charging session?",
        answer:
            "Once you arrive at a station, select the charger in the app and scan the QR code on the charger (or tap 'Start' on the selected connector). Confirm the connector and press Start. Charging will begin automatically once connected.",
    },
    {
        question: "How do I stop charging?",
        answer:
            "You can stop charging from the active session screen by tapping 'Stop Charging'. You can also stop from the charger itself. Once stopped, unplug the connector and return it to the holder.",
    },
    {
        question: "How am I billed for charging?",
        answer:
            "Billing is based on the energy consumed (kWh) or session time, depending on the station operator's pricing. The estimated cost is shown before you start, and the final amount is charged to your payment method after the session ends.",
    },
    {
        question: "Which payment methods are supported?",
        answer:
            "We support major credit and debit cards, as well as popular digital wallets. You can add or update your payment method in the app's Payment section under your profile.",
    },
    {
        question: "Where can I find my charging receipts?",
        answer:
            "All completed charging sessions are listed in the 'Charging History' section. Tap any session to view details and download or share a digital receipt.",
    },
    {
        question: "What should I do if a charger is not working?",
        answer:
            "If the charger is unresponsive or damaged, do not attempt to repair it. Report the issue from the charger's detail screen using the 'Report Issue' option, or contact support. We will notify the station operator and help you find an alternative charger.",
    },
    {
        question: "What if my charging session is interrupted unexpectedly?",
        answer:
            "If your session stops unexpectedly, check that the connector is properly plugged in and that the vehicle is not limiting the charge. If the problem persists, stop the session in the app and start a new one, or contact support. You will only be billed for energy actually delivered.",
    },
    {
        question: "Can I use the app without enabling location access?",
        answer:
            "Yes. You can manually search for stations by address or name if location access is disabled. However, enabling location access gives you the fastest way to find chargers near you.",
    },
    {
        question: "How do I request a refund?",
        answer:
            "Refund requests for failed or interrupted sessions can be submitted from the session details screen or through Contact Support within 7 days of the transaction. Requests are reviewed by the station operator.",
    },
    {
        question: "How do I update my account details?",
        answer:
            "Go to Profile > Account Settings to update your name, email, phone number, and password. Some changes may require verification.",
    },
    {
        question: "How do I delete my account?",
        answer:
            "You can request account deletion from Profile > Account Settings > Delete Account. Note that some data may be retained for legal and accounting purposes as described in our Privacy Policy.",
    },
    {
        question: "Which charging standards are supported?",
        answer:
            "ChargeCheckout supports stations with Type 2 (AC), CCS2 (DC fast charging), CHAdeMO, and GB/T connectors. The connector type is listed on each station's detail page.",
    },
    {
        question: "Is my payment information secure?",
        answer:
            "Yes. All payments are processed through PCI-DSS-compliant third-party payment providers. Your card details are encrypted and never stored on our servers.",
    },
    {
        question: "How do I contact support?",
        answer:
            "You can reach our support team through the Contact Support section in the app, or by emailing support@chargecheckout.com. We typically respond within 24 hours.",
    },
];

const FAQScreen: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

    return (
        <ScreenProvider
            header={<CustomHeader title="FAQ" onBackPress={appNavigation.goBack} />}
            scrollable
            contentContainerClassName="flex-grow px-5 py-4"
        >
            <Text className="text-sm text-gray-600 leading-5 mb-6">
                Find answers to the most common questions about using
                ChargeCheckout. Tap a question to expand the answer.
            </Text>

            <View className="bg-gray-50 rounded-xl overflow-hidden mb-6">
                {FAQ_DATA.map((item, index) => {
                    const isExpanded = expandedIndex === index;
                    const isLast = index === FAQ_DATA.length - 1;

                    return (
                        <View
                            key={index}
                            className={isLast ? "" : "border-b border-gray-200"}
                        >
                            <Pressable
                                className="px-4 py-3 flex-row items-center justify-between"
                                onPress={() => toggleItem(index)}
                            >
                                <Text className="text-sm font-semibold text-gray-900 flex-1 pr-3">
                                    {item.question}
                                </Text>
                                <Text className="text-base text-gray-500">
                                    {isExpanded ? "−" : "+"}
                                </Text>
                            </Pressable>
                            {isExpanded && (
                                <View className="px-4 pb-4">
                                    <Text className="text-sm text-gray-600 leading-5">
                                        {item.answer}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>

            <View className="bg-gray-50 rounded-xl p-4">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                    Still need help?
                </Text>
                <Text className="text-sm text-gray-600 leading-5 mb-3">
                    Can't find the answer you're looking for? Our support team is
                    here to help.
                </Text>
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

export default FAQScreen;