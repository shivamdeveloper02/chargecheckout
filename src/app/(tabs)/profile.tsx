import { ScreenProvider, Text } from '@/components/Reusable';
import React from 'react';

const ProfileScreen: React.FC = () => {
  return (
    <ScreenProvider>
      <Text>ProfileScreen</Text>
    </ScreenProvider>
  );
}
export default ProfileScreen