import { LoadingScreen, ScreenProvider, Text } from '@/components/Reusable';
import React, { useEffect, useState } from 'react';

const ChargerScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Replace with charger API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenProvider>
      {isLoading ? (
        <LoadingScreen message="Loading chargers..." />
      ) : (
        <Text>ChargerScreen</Text>
      )}
    </ScreenProvider>
  );
};

export default ChargerScreen;
