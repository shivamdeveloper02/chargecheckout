import { Icon, toast } from '@/components';
import { LoadingScreen, ScreenProvider, Text } from '@/components/Reusable';
import { BrandColors } from '@/constants/theme';
import { ACCOUNT_ITEMS, MANAGE_ITEMS, SHOP_ITEMS, STATION_ITEMS } from '@/data';
import { MenuItem } from '@/types';
import { navigateTo, pushTo, replaceWith, ROUTES } from '@/utils';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const MenuListCard: React.FC<{
  items: MenuItem[]; onItemPress: (item: MenuItem) => void;
}> = ({ items, onItemPress }) => {
  return (
    <View className="bg-white rounded-2xl px-4 border border-slate-300">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => onItemPress(item)}
            className={`flex-row items-center justify-between py-4 ${!isLast ? 'border-b border-slate-100' : ''
              }`}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-8 items-center justify-center mr-3">
                <Icon
                  name={item.iconName}
                  type={item.iconType || 'Ionicons'}
                  size={21}
                  color={BrandColors.secondary.DEFAULT}
                />
              </View>
              <Text
                weight="medium"
                className="text-[14px] text-slate-800 flex-1"
              >
                {item.label}
              </Text>
            </View>

            <View className="flex-row items-center">
              {item.badge ? (
                <View className="bg-primary px-2.5 py-0.5 rounded-full mr-2">
                  <Text
                    weight="semibold"
                    className="text-[10px] text-white"
                  >
                    {item.badge}
                  </Text>
                </View>
              ) : null}
              <Icon
                name="chevron-forward"
                type="Ionicons"
                size={18}
                color={BrandColors.secondary.DEFAULT}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ProfileScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Replace with profile API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuPress = (item: MenuItem) => {
    if (item.id === 'logout') {
      toast.info('Logging out of your account...', 'Logout');
      replaceWith(ROUTES.LOGIN);
      return;
    }
    toast.info(`${item.label} selected`, 'Profile');
  };

  return (
    <ScreenProvider
      hiddenStatusBar={false}
      statusBarStyle={isLoading ? 'dark-content' : 'light-content'}
      statusBarBackgroundColor={isLoading ? '#FFFFFF' : BrandColors.secondary.DEFAULT}
      safeArea={false}
      className="flex-1 bg-slate-50"
      backgroundColor={isLoading ? '#FFFFFF' : '#F8FAFC'}
    >
      {isLoading ? (
        <LoadingScreen message="Loading profile..." />
      ) : (
        <ScrollView
          className="flex-1 bg-slate-50"
          contentContainerClassName="pb-28"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-secondary pt-14 pb-5 px-4 rounded-b-3xl overflow-hidden relative">
            <View className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-primary/15" />
            <View className="absolute right-8 -bottom-6 w-24 h-24 rounded-full bg-teal/20" />
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1 mr-2 mt-4">
                <View className="w-14 h-14 rounded-full border-[2.5px] border-primary bg-primary-50 items-center justify-center mr-3">
                  <Text
                    weight="bold"
                    className="text-base text-secondary tracking-wide"
                  >
                    SP
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    weight="bold"
                    numberOfLines={1}
                    className="text-[17px] text-white"
                  >
                    Shivam Pandey
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-xs text-primary-100 mt-0.5"
                  >
                    shivam.developer02@gmail.com
                  </Text>
                  <Text className="text-xs text-primary-100 mt-0.5">
                    +919555804662
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  toast.info('Edit profile coming soon', 'Edit Profile')
                }
                className="w-10 h-10 items-center justify-center bg-white/95 rounded-full shadow-sm"
              >
                <Icon
                  name="edit-3"
                  size={16}
                  color={BrandColors.secondary.DEFAULT}
                  type="Feather"
                />
              </TouchableOpacity>
            </View>
            <View className="mt-5 bg-white/10 border border-primary/30 rounded-2xl px-4 py-3 flex-row items-center justify-between overflow-hidden">
              <View className="flex-1 pr-2">
                <View className="flex-row items-center">
                  <Text weight="semibold" className="text-xs text-white">
                    Your{' '}
                  </Text>
                  <Text weight="bold" className="text-xs text-primary">
                    GREEN
                  </Text>
                  <Text weight="semibold" className="text-xs text-white mr-1.5">
                    {' '}
                    journey starts today
                  </Text>
                  <Icon
                    name="leaf"
                    type="Ionicons"
                    size={14}
                    color={BrandColors.primary.DEFAULT}
                  />
                </View>
                <Text className="text-[11px] text-slate-200 mt-0.5">
                  Every charge counts for a greener Earth
                </Text>
              </View>
              <View className="w-11 h-11 rounded-full bg-primary/20 items-center justify-center border border-primary/40">
                <Icon
                  name="earth"
                  type="Ionicons"
                  size={26}
                  color={BrandColors.primary.DEFAULT}
                />
              </View>
            </View>
          </View>
          <View className="px-4 pt-4 gap-4">
            {/* Upgrade Membership Banner */}
            <View className="bg-dark rounded-2xl p-4 flex-row items-center justify-between border border-dark-border shadow-sm">
              <View className="flex-row items-center flex-1 mr-3">
                <View className="mr-3">
                  <Icon
                    name="sparkles"
                    type="Ionicons"
                    size={20}
                    color={BrandColors.primary.DEFAULT}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-primary-200">
                    Upgrade to{' '}
                    <Text weight="bold" className="text-white">
                      Charge Checkout MILES
                    </Text>{' '}
                    @₹249
                  </Text>
                  <Text className="text-[11px] text-slate-300 mt-1 leading-4">
                    Get{' '}
                    <Text weight="bold" className="text-white">
                      10% off + 5% coins cashback
                    </Text>{' '}
                    on every charge ⚡
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  toast.success('MILES Upgrade selected', 'Membership')
                }
                className="border border-primary rounded-xl px-3.5 py-2 bg-primary/10"
              >
                <Text weight="semibold" className="text-xs text-primary">
                  Buy Now
                </Text>
              </TouchableOpacity>
            </View>

            {/* 3 Quick Action Tabs: Sessions, Offers, Help */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => toast.info('Viewing charging sessions', 'Sessions')}
                className="flex-1 bg-white rounded-2xl py-4 items-center justify-center border border-slate-300"
              >
                <View className="w-10 h-10 rounded-xl bg-secondary-50 items-center justify-center mb-2">
                  <Icon
                    name="document-text"
                    type="Ionicons"
                    size={22}
                    color={BrandColors.secondary.DEFAULT}
                  />
                </View>
                <Text weight="medium" className="text-xs text-slate-800">
                  Sessions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => toast.info('Viewing available offers', 'Offers')}
                className="flex-1 bg-white rounded-2xl py-4 items-center justify-center border border-slate-300"
              >
                <View className="w-10 h-10 rounded-xl bg-secondary-50 items-center justify-center mb-1.5">
                  <Icon
                    name="brightness-percent"
                    type="MaterialCommunityIcons"
                    size={22}
                    color={BrandColors.secondary.DEFAULT}
                  />
                </View>
                <Text weight="medium" className="text-xs text-slate-800">
                  Offers
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => pushTo(ROUTES.CONTACTUS)}
                className="flex-1 bg-white rounded-2xl py-4 items-center justify-center border border-slate-300"
              >
                <View className="w-10 h-10 rounded-xl bg-secondary-50 items-center justify-center mb-1.5">
                  <Icon
                    name="headset"
                    type="Ionicons"
                    size={22}
                    color={BrandColors.secondary.DEFAULT}
                  />
                </View>
                <Text weight="medium" className="text-xs text-slate-800">
                  Help
                </Text>
              </TouchableOpacity>
            </View>

            {/* Wallet Total Balance Card */}
            <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between border border-slate-300">
              <View className="flex-row items-center">
                <View className="w-11 h-11 rounded-xl bg-secondary-50 items-center justify-center mr-3">
                  <Icon
                    name="wallet"
                    type="Ionicons"
                    size={24}
                    color={BrandColors.secondary.DEFAULT}
                  />
                </View>
                <View>
                  <Text weight="bold" className="text-base text-slate-900">
                    ₹ 0.00
                  </Text>
                  <Text className="text-xs text-slate-500">Total Balance</Text>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigateTo(ROUTES.WALLET)}
                className="border border-primary rounded-xl px-4 py-2 bg-primary-50/60"
              >
                <Text weight="semibold" className="text-xs text-primary-700">
                  Add Credits
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-1">
              <Text weight="bold" className="text-base text-slate-900 mb-2.5">
                Manage
              </Text>
              <MenuListCard items={MANAGE_ITEMS} onItemPress={handleMenuPress} />
            </View>
            {/* Stations Section */}
            <View className="mt-1">
              <Text weight="bold" className="text-base text-slate-900 mb-2.5">
                Stations
              </Text>
              <MenuListCard items={STATION_ITEMS} onItemPress={handleMenuPress} />
            </View>

            {/* Shop Section */}
            <View className="mt-1">
              <Text weight="bold" className="text-base text-slate-900 mb-2.5">
                Shop
              </Text>
              <MenuListCard items={SHOP_ITEMS} onItemPress={handleMenuPress} />
            </View>
            <View className="mt-1">
              <Text weight="bold" className="text-base text-slate-900 mb-2.5">
                Account Settings
              </Text>
              <MenuListCard items={ACCOUNT_ITEMS} onItemPress={handleMenuPress} />
            </View>
            <View className="items-center justify-center py-6">
              <Text
                weight="medium"
                className="text-xs text-slate-500 tracking-wider"
              >
                CHARGE CHECKOUT IN INDIA 🇮🇳
              </Text>
              <Text weight='regular' className="text-xs text-slate-600 mt-1">
                v1.0.0
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </ScreenProvider>
  );
};

export default ProfileScreen;
