import { Button } from '@/components/Button';
import { Input } from '@/components/Forms/Input';
import Icon from '@/components/Icon';
import { toast } from '@/components/Toast';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setIsLoading(true);
    // Simulate instant local authentication without API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome back to ChargeCheckout!', 'Signed In');
      router.replace('/onboarding');
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
          className="px-6 py-6"
        >
          {/* Logo & Header */}
          <View className="flex-1 items-center justify-center">
            <Image
              source={require('@/assets/images/chargecheckout-logo.png')}
              style={{ width: 140, height: 95 }}
              contentFit="contain"
              priority="high"
            />
            <View className="flex-row items-center mt-2">
              <Text className="text-3xl font-extrabold tracking-tight text-secondary">
                Charge
              </Text>
              <Text className="text-3xl font-extrabold tracking-tight text-primary">
                Checkout
              </Text>
            </View>
            <Text className="text-slate-500 text-sm mt-1 font-medium text-center">
              Sign in to manage your EV charging & checkout
            </Text>
          </View>
          <View className="space-y-4 gap-4">
            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
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
            <View>
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                autoCapitalize="none"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                leftIcon={<Icon name="lock-closed-outline" size={18} color="#94A3B8" />}
                required
              />

              {/* Forgot Password Link */}
              <View className="items-end mt-2">
                <Pressable
                  onPress={() => router.push('/forgot-password')}
                  hitSlop={8}
                >
                  <Text className="text-xs font-semibold text-[#0A3D91]">
                    Forgot Password?
                  </Text>
                </Pressable>
              </View>
            </View>
            <View className="pt-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                onPress={handleLogin}
              >
                Sign In
              </Button>
            </View>
          </View>
          <View className="flex-1 justify-end items-center mt-12 pb-4">
            <Text className="text-sm text-slate-400 font-medium">
              Powering Next-Gen EV Charging Operations
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
