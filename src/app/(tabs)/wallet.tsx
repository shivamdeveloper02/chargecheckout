import { LoadingScreen, ScreenProvider, Text } from '@/components/Reusable';
import React, { useEffect, useState } from 'react';

const WalletScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Replace with wallet API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenProvider>
      {isLoading ? (
        <LoadingScreen message="Loading wallet..." />
      ) : (
        <Text>WalletScreen</Text>
      )}
    </ScreenProvider>
  );
};

export default WalletScreen;
