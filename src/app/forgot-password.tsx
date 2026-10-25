import { Button } from '@/components/Button';
import { Input } from '@/components/Forms/Input';
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
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: {
      email?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (!validate()) return;

    setIsLoading(true);
    // Simulate instant password reset without API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Your password has been updated. Please sign in.', 'Password Reset');
      router.replace('/login');
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
          {/* Top Navigation */}
          <View className="flex-row items-center justify-between mb-6">
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center active:bg-slate-200"
              accessibilityLabel="Go back"
            >
              <Icon name="arrow-back" size={20} color="#0F172A" />
            </Pressable>
            <View className="w-10" />
          </View>

          {/* Heading */}
          <View className="mb-8">
            <Text className="text-2xl font-extrabold tracking-tight text-slate-900">
              Reset Password
            </Text>
            <Text className="text-slate-500 text-sm mt-1.5 leading-relaxed font-medium">
              Enter your email and create a new secure password for your account.
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-4 gap-4">
            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              leftIcon={<Icon name="mail-outline" size={18} color="#94A3B8" />}
              clearable
              onClear={() => setEmail('')}
              required
            />

            <Input
              label="New Password"
              placeholder="Enter new password (min. 6 chars)"
              type="password"
              autoCapitalize="none"
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
                if (errors.newPassword)
                  setErrors((prev) => ({ ...prev, newPassword: undefined }));
              }}
              error={errors.newPassword}
              leftIcon={<Icon name="lock-closed-outline" size={18} color="#94A3B8" />}
              required
            />

            <Input
              label="Confirm Password"
              placeholder="Re-enter new password"
              type="password"
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              error={errors.confirmPassword}
              leftIcon={<Icon name="checkmark-circle-outline" size={18} color="#94A3B8" />}
              required
            />

            {/* Submit Button */}
            <View className="pt-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                onPress={handleResetPassword}
                className="bg-[#0A3D91] border-[#0A3D91] rounded-2xl py-3.5 shadow-md shadow-[#0A3D91]/20"
              >
                Reset Password
              </Button>
            </View>

            {/* Back to sign in */}
            <View className="items-center mt-4">
              <Pressable
                onPress={() => router.replace('/login')}
                hitSlop={8}
                className="flex-row items-center gap-1"
              >
                <Text className="text-xs text-slate-500 font-medium">Remember your password?</Text>
                <Text className="text-xs font-bold text-[#0A3D91]">Sign In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
