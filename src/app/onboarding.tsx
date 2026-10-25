import Icon from '@/components/Icon';
import { toast } from '@/components/Toast';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/Reusable';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const [errors, setErrors] = useState<{
    fullName?: string;
    mobileNumber?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const newErrors: { fullName?: string; mobileNumber?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter your mobile number';
    } else if (!/^[0-9+ -]{8,15}$/.test(mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    setIsLoading(true);
    // Instant local flow without API calls
    setTimeout(() => {
      setIsLoading(false);
      setIsCompleted(true);
      toast.success(`Welcome to ChargeCheckout, ${fullName.trim()}!`, 'Profile Saved');
    }, 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="px-6 py-4"
        >
          {/* Top Back Navigation Arrow */}
          <View className="flex-row items-center mb-6">
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              className="p-1 -ml-1 active:opacity-60"
              accessibilityLabel="Back"
            >
              <Icon name="arrow-back" size={24} color="#0F172A" />
            </Pressable>
          </View>

          {/* Heading from screenshot */}
          <View className="items-center px-4 mb-10">
            <Text className="text-[26px] font-bold text-[#1A2544] text-center leading-8">
              Please tell us a bit more{'\n'}about yourself
            </Text>
          </View>

          {!isCompleted ? (
            /* Form Fields */
            <View className="space-y-4 gap-4">
              {/* Full Name Input */}
              <View>
                <View
                  className={`
                    border rounded-xl px-4 py-3 bg-white
                    ${errors.fullName
                      ? 'border-rose-400'
                      : focusedField === 'fullName'
                        ? 'border-[#00D06C]'
                        : 'border-slate-300'
                    }
                  `}
                >
                  <Text className="text-[11px] font-medium text-slate-500 mb-1">
                    Full Name
                  </Text>
                  <TextInput
                    value={fullName}
                    onChangeText={(text) => {
                      setFullName(text);
                      if (errors.fullName)
                        setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    placeholderTextColor="#CBD5E1"
                    autoCapitalize="words"
                    className="text-sm font-semibold text-slate-900 p-0 m-0"
                  />
                </View>
                {errors.fullName ? (
                  <Text className="text-[11px] text-rose-500 mt-1 ml-1 font-medium">
                    {errors.fullName}
                  </Text>
                ) : null}
              </View>

              {/* Mobile Number Input */}
              <View>
                <View
                  className={`
                    border rounded-xl px-4 py-3 bg-white
                    ${errors.mobileNumber
                      ? 'border-rose-400'
                      : focusedField === 'mobile'
                        ? 'border-[#00D06C]'
                        : 'border-slate-300'
                    }
                  `}
                >
                  <Text className="text-[11px] font-medium text-slate-500 mb-1">
                    Mobile Number
                  </Text>
                  <TextInput
                    value={mobileNumber}
                    onChangeText={(text) => {
                      setMobileNumber(text);
                      if (errors.mobileNumber)
                        setErrors((prev) => ({ ...prev, mobileNumber: undefined }));
                    }}
                    onFocus={() => setFocusedField('mobile')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#CBD5E1"
                    keyboardType="phone-pad"
                    className="text-sm font-semibold text-slate-900 p-0 m-0"
                  />
                </View>
                {errors.mobileNumber ? (
                  <Text className="text-[11px] text-rose-500 mt-1 ml-1 font-medium">
                    {errors.mobileNumber}
                  </Text>
                ) : null}
              </View>

              {/* Unique / Referral Code (Optional) */}
              <View>
                <View
                  className={`
                    border rounded-xl px-4 py-3 bg-white
                    ${focusedField === 'referral'
                      ? 'border-[#00D06C]'
                      : 'border-slate-300'
                    }
                  `}
                >
                  <Text className="text-[11px] font-medium text-slate-500 mb-1">
                    Enter your unique code here (Optional)
                  </Text>
                  <TextInput
                    value={referralCode}
                    onChangeText={setReferralCode}
                    onFocus={() => setFocusedField('referral')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Referral or promo code"
                    placeholderTextColor="#CBD5E1"
                    autoCapitalize="characters"
                    className="text-sm font-semibold text-slate-900 p-0 m-0"
                  />
                </View>
              </View>

              {/* Helpful Hint from screenshot */}
              <View className="mt-1">
                <Text className="text-xs font-semibold text-slate-700">
                  **Signup with new vehicle number to earn credits
                </Text>
              </View>

              {/* Continue Button matching screenshot */}
              <View className="pt-4">
                <Pressable
                  disabled={isLoading}
                  onPress={handleContinue}
                  className="w-full py-4 rounded-xl items-center justify-center bg-[#FA937A] active:opacity-90 shadow-sm shadow-[#FA937A]/30"
                >
                  <Text className="text-base font-bold text-white tracking-wide">
                    {isLoading ? 'Saving...' : 'Continue'}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            /* Completed Success State */
            <View className="bg-slate-50 border border-slate-200 rounded-3xl p-6 items-center">
              <View className="w-16 h-16 rounded-full bg-emerald-100 items-center justify-center mb-4">
                <Icon name="checkmark-circle" size={32} color="#00D06C" />
              </View>

              <Text className="text-xl font-bold text-slate-900 text-center">
                Profile Setup Complete!
              </Text>
              <Text className="text-xs text-slate-500 text-center mt-1.5 leading-relaxed">
                Welcome to ChargeCheckout, {fullName}. Your account is ready for seamless EV charging.
              </Text>

              <View className="w-full bg-white border border-slate-200 rounded-2xl p-4 my-5 space-y-2 gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-xs text-slate-500">Name</Text>
                  <Text className="text-xs font-bold text-slate-900">{fullName}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-xs text-slate-500">Mobile</Text>
                  <Text className="text-xs font-bold text-slate-900">{mobileNumber}</Text>
                </View>
                {referralCode ? (
                  <View className="flex-row justify-between">
                    <Text className="text-xs text-slate-500">Referral</Text>
                    <Text className="text-xs font-bold text-emerald-600">{referralCode}</Text>
                  </View>
                ) : null}
              </View>

              <Pressable
                onPress={() => router.replace('/login')}
                className="w-full py-3.5 rounded-xl items-center justify-center bg-[#0A3D91] active:opacity-90"
              >
                <Text className="text-sm font-bold text-white">Go to Sign In</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
