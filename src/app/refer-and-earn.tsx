import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import { appNavigation } from "@/utils";
import React from "react";
import { Alert, Pressable, Share, View } from "react-native";

const REFERRAL_CODE = "CHARGECC25";
const REFERRAL_LINK = "https://chargecheckout.com/invite?code=" + REFERRAL_CODE;
const REFERRAL_REWARD = "₹100";
const FRIEND_REWARD = "₹100";

const ReferAndEarnScreen: React.FC = () => {
    const handleCopyCode = async () => {
        // await Clipboard.setStringAsync(REFERRAL_CODE);
        Alert.alert("Copied", "Referral code copied to clipboard.");
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message:
                    `Join me on ChargeCheckout and get ${FRIEND_REWARD} off your first EV charging session! ` +
                    `Use my referral code: ${REFERRAL_CODE}\n\nDownload here: ${REFERRAL_LINK}`,
                url: REFERRAL_LINK,
                title: "Invite friends to ChargeCheckout",
            });
        } catch {
            // user dismissed or share failed
        }
    };

    return (
        <ScreenProvider
            header={<CustomHeader title="Refer & Earn" onBackPress={appNavigation.goBack} />}
            scrollable
            contentContainerClassName="flex-grow px-5 py-4"
        >
            {/* Hero Card */}
            <View className="bg-secondary rounded-2xl p-6 mb-6 items-center">
                <Text className="text-white text-2xl font-bold text-center mb-2">
                    Invite Friends, Earn Rewards
                </Text>
                <Text className="text-white/80 text-sm text-center leading-5 mb-6">
                    Share your referral code with friends. When they complete their
                    first charging session, you both get rewarded.
                </Text>

                {/* Referral code pill */}
                <View className="bg-white/15 border border-white/30 border-dashed rounded-xl px-6 py-3 mb-5">
                    <Text className="text-white text-2xl font-bold tracking-widest">
                        {REFERRAL_CODE}
                    </Text>
                </View>

                {/* Actions */}
                <View className="flex-row gap-3 w-full">
                    <Pressable
                        className="flex-1 bg-white rounded-xl py-3 items-center active:opacity-80"
                        onPress={handleCopyCode}
                    >
                        <Text className="text-sm font-semibold text-secondary">
                            Copy Code
                        </Text>
                    </Pressable>
                    <Pressable
                        className="flex-1 bg-white/20 border border-white/40 rounded-xl py-3 items-center active:opacity-80"
                        onPress={handleShare}
                    >
                        <Text className="text-sm font-semibold text-white">
                            Share
                        </Text>
                    </Pressable>
                </View>
            </View>

            {/* Rewards Row */}
            <View className="flex-row gap-3 mb-6">
                <View className="flex-1 bg-gray-50 rounded-xl p-4 items-center border border-gray-200">
                    <Text className="text-xs text-gray-500 mb-1 text-center">
                        You Earn
                    </Text>
                    <Text className="text-xl font-bold text-green-600">
                        {REFERRAL_REWARD}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1 text-center">
                        per referral
                    </Text>
                </View>
                <View className="flex-1 bg-gray-50 rounded-xl p-4 items-center border border-gray-200">
                    <Text className="text-xs text-gray-500 mb-1 text-center">
                        Friend Gets
                    </Text>
                    <Text className="text-xl font-bold text-green-600">
                        {FRIEND_REWARD}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1 text-center">
                        on first charge
                    </Text>
                </View>
            </View>

            {/* How It Works – timeline style */}
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-4">
                    How It Works
                </Text>

                {/* Step 1 */}
                <View className="flex-row mb-4">
                    <View className="items-center mr-3">
                        <View className="w-7 h-7 rounded-full bg-secondary items-center justify-center">
                            <Text className="text-xs font-bold text-white">1</Text>
                        </View>
                        <View className="w-px flex-1 bg-gray-300 mt-1" />
                    </View>
                    <View className="flex-1 pb-1">
                        <Text className="text-sm font-semibold text-gray-800 mb-1">
                            Share your code
                        </Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            Send your unique referral code or invite link to friends.
                        </Text>
                    </View>
                </View>

                {/* Step 2 */}
                <View className="flex-row mb-4">
                    <View className="items-center mr-3">
                        <View className="w-7 h-7 rounded-full bg-secondary items-center justify-center">
                            <Text className="text-xs font-bold text-white">2</Text>
                        </View>
                        <View className="w-px flex-1 bg-gray-300 mt-1" />
                    </View>
                    <View className="flex-1 pb-1">
                        <Text className="text-sm font-semibold text-gray-800 mb-1">
                            Friend signs up
                        </Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            Your friend downloads ChargeCheckout and enters your code
                            during sign-up.
                        </Text>
                    </View>
                </View>

                {/* Step 3 */}
                <View className="flex-row">
                    <View className="items-center mr-3">
                        <View className="w-7 h-7 rounded-full bg-secondary items-center justify-center">
                            <Text className="text-xs font-bold text-white">3</Text>
                        </View>
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-semibold text-gray-800 mb-1">
                            They charge, you both earn
                        </Text>
                        <Text className="text-sm text-gray-600 leading-5">
                            After your friend completes their first charging session,
                            rewards are credited to both accounts.
                        </Text>
                    </View>
                </View>
            </View>

            {/* Terms */}
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                    Terms & Conditions
                </Text>
                <View className="gap-2">
                    <View className="flex-row">
                        <Text className="text-sm text-gray-400 mr-2">•</Text>
                        <Text className="text-sm text-gray-600 leading-5 flex-1">
                            Rewards are credited after the referred friend completes
                            their first successful charging session.
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-sm text-gray-400 mr-2">•</Text>
                        <Text className="text-sm text-gray-600 leading-5 flex-1">
                            Rewards are added as wallet credit and cannot be
                            withdrawn as cash.
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-sm text-gray-400 mr-2">•</Text>
                        <Text className="text-sm text-gray-600 leading-5 flex-1">
                            Referral codes cannot be used for self-referral.
                        </Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-sm text-gray-400 mr-2">•</Text>
                        <Text className="text-sm text-gray-600 leading-5 flex-1">
                            ChargeCheckout reserves the right to modify or end the
                            referral program at any time.
                        </Text>
                    </View>
                </View>
            </View>

            {/* Track Referrals */}
            <Pressable
                className="bg-gray-50 rounded-xl p-4 flex-row items-center justify-between active:opacity-80"
            // onPress={() => appNavigation.toReferralHistory?.()}
            >
                <View className="flex-1 pr-3">
                    <Text className="text-base font-semibold text-gray-900 mb-1">
                        Track Your Referrals
                    </Text>
                    <Text className="text-sm text-gray-600 leading-5">
                        View your invited friends, their status, and earned rewards.
                    </Text>
                </View>
                <Text className="text-lg text-gray-400">›</Text>
            </Pressable>
        </ScreenProvider>
    );
};

export default ReferAndEarnScreen;