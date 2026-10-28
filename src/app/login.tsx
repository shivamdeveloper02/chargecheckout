import { Button, Icon } from '@/components';
import { Input } from '@/components/Forms';
import { ScreenProvider, Text } from '@/components/Reusable';
import { toast } from '@/components/Toast';
import { EMAIL_REGEX } from '@/utils';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!EMAIL_REGEX.test(email.trim())) {
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

  const handleLogin = async () => {
    if (isLoading || !validate()) return;
    setIsLoading(true);
    try {
      // TODO: Replace with your authentication API.
      // This is currently a local demonstration, not real authentication.
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success(
        'Welcome back to ChargeCheckout!',
        'Signed In'
      );
      router.replace('/(tabs)');
    } catch {
      toast.error('Unable to sign in. Please try again.', 'Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenProvider
      className='flex-1 bg-white px-5'
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
            Sign in to manage your EV charging & checkout
          </Text>
        </View>
        <View className="mt-8 gap-4">
          <Input
            label="Email Address"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setErrors((previous) => ({
                ...previous,
                email: undefined,
              }));
            }}
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
          <View>
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setErrors((previous) => ({
                  ...previous,
                  password: undefined,
                }));
              }}
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
            <View className="mt-3 items-end">
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
          <View className="mt-2">
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
          <View className="mt-2 flex-row flex-wrap items-center justify-center">
            <Text className="text-sm text-slate-500">
              Don't have an account?{' '}
            </Text>

            <Pressable
              onPress={() => router.push('/signup')}
              hitSlop={8}
            >
              <Text className="text-sm font-semibold text-[#0A3D91]">
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenProvider>
  );
};

export default LoginScreen;