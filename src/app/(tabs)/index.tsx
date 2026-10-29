import { Icon } from '@/components';
import { Input } from '@/components/Forms';
import { LoadingScreen, ScreenProvider, Text } from '@/components/Reusable';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

const MapHomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Replace with nearby stations / map API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenProvider
      hiddenStatusBar={true}
      edges={['bottom']}
    >
      {isLoading ? (
        <LoadingScreen message="Loading nearby stations..." />
      ) : (
        <View className='flex-1 bg-white'>
          <View className='absolute top-0 left-0 right-0 h-48 bg-secondary z-10 pt-16 px-4'>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity
                activeOpacity={0.8}
                className='flex-row items-center bg-white px-4 py-2 rounded-xl shadow-sm'
              >
                <Icon name='map-marker-alt' size={16} color='#2563EB' type="FontAwesome5" />
                <Text className='text-gray-800 text-sm mx-2 font-medium'>
                  Mumbai, Maharashtra
                </Text>
                <Icon name='chevron-down' size={14} color='#9CA3AF' type="FontAwesome5" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                className='w-11 h-11 items-center justify-center bg-white rounded-full shadow-sm'
              >
                <Icon name='bell' size={20} color='#1F2937' type='FontAwesome5' />
                <View className='absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-[1.5px] border-white' />
              </TouchableOpacity>
            </View>
            <View className='mt-3'>
              <Input
                placeholder="Search for places, areas..."
                leftIcon={<Icon name='search' size={18} color='#9CA3AF' type="FontAwesome5" />}
                className='text-sm'
                clearable={true}
              />
            </View>
          </View>
        </View>
      )}
    </ScreenProvider>
  );
};

export default MapHomeScreen;
