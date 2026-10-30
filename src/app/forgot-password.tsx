import { Button } from '@/components/Button';
import { Input } from '@/components/Forms/Input';
import Icon from '@/components/Icon';
import { ScreenProvider, Text } from '@/components/Reusable';
import { toast } from '@/components/Toast';
import { EMAIL_REGEX, goBack, pushTo, replaceWith, ROUTES } from '@/utils';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

const ForgotPassword: React.FC = () => {
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
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
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
      replaceWith(ROUTES.LOGIN);
    }, 600);
  };

  return (
    <ScreenProvider className = 'flex-1 bg-white px-5'>
      <View className="flex-grow py-6">
        <View className="flex-row items-center justify-between mb-6">
          <Pressable
            onPress={() => goBack(ROUTES.LOGIN)}
            hitSlop={12}
            className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center active:bg-slate-200"
            accessibilityLabel="Go back"
          >
            <Icon name="arrow-back" size={20} color="#0F172A" />
          </Pressable>
          <View className="w-10" />
        </View>
        <View className="mb-8">
          <Text className="text-3xl tracking-tight text-secondary">
            Reset Password
          </Text>
          <Text className="text-slate-500 text-sm mt-1.5 leading-relaxed">
            Enter your email and create a new secure password for your account.
          </Text>
        </View>
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
            required
          />
          <Input
            label="New Password"
            placeholder="Enter new password (min. 8 chars)"
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
          <View className="mt-2 flex-row flex-wrap items-center justify-center">
            <Text className="text-sm text-slate-500">
              Remember your password?{' '}
            </Text>
            <Pressable
              onPress={() => pushTo(ROUTES.LOGIN)}
              hitSlop={8}
            >
              <Text className="text-sm font-semibold text-[#0A3D91]">
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View className="items-center pb-4 pt-6">
        <Text className="text-center text-xs leading-5 text-slate-400">
          Powering Next-Gen EV Charging Operations
        </Text>
      </View>
    </ScreenProvider >
  );
}
export default ForgotPassword;