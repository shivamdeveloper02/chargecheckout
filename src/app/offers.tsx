import { Icon, toast } from '@/components';
import { ScreenProvider, Text } from '@/components/Reusable';
import { BrandColors } from '@/constants/theme';
import { COUPONS_DATA, COUPON_TABS } from '@/data';
import { CouponCategory, CouponItem } from '@/types';
import { goBack } from '@/utils';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const CouponCard: React.FC<{
  coupon: CouponItem;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onApply: (coupon: CouponItem) => void;
}> = ({ coupon, isExpanded, onToggleExpand, onApply }) => {
  return (
    <View className="bg-secondary-50/55 rounded-2xl border border-secondary-100 overflow-hidden">
      {/* Top White Summary Card */}
      <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between border-b border-secondary-100/70 shadow-xs">
        <View className="flex-row items-center flex-1 mr-3">
          {/* Discount Badge */}
          <View className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-200 items-center justify-center mr-3.5 px-1">
            <Text
              weight="bold"
              numberOfLines={1}
              className="text-[11px] text-primary-700 leading-3.5"
            >
              {coupon.badgeTop}
            </Text>
            <Text
              weight="semibold"
              numberOfLines={1}
              className="text-[9px] text-secondary mt-0.5 leading-3"
            >
              {coupon.badgeBottom}
            </Text>
          </View>

          {/* Coupon Title & Subtitle */}
          <View className="flex-1">
            <Text
              weight="bold"
              numberOfLines={1}
              className="text-[15px] text-slate-900 tracking-wide"
            >
              {coupon.title}
            </Text>
            <Text
              numberOfLines={2}
              className="text-xs text-slate-500 mt-0.5 leading-4"
            >
              {coupon.subtitle}
            </Text>
          </View>
        </View>

        {/* Apply Action Button */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => onApply(coupon)}
          className="px-3.5 py-1.5 rounded-xl bg-primary/10 border border-primary/40"
        >
          <Text weight="semibold" className="text-xs text-primary-700">
            Apply
          </Text>
        </TouchableOpacity>
      </View>
      <View className="px-4 pt-3.5 pb-3.5">
        {isExpanded && (
          <View className="gap-2 mb-3">
            {coupon.terms.map((term, index) => (
              <View key={index} className="flex-row items-center">
                <View className="w-1.5 h-1.5 rounded-full bg-secondary/70 mr-2.5" />
                <Text className="text-[13px] text-slate-600 flex-1 leading-5">
                  {term}
                </Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onToggleExpand(coupon.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          className="self-start"
        >
          <Text weight="bold" className="text-xs text-secondary tracking-wide">
            {isExpanded ? '-Less Info' : '+More Info'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OffersScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CouponCategory>('my_coupons');
  const [collapsedIds, setCollapsedIds] = useState<Record<string, boolean>>({});

  const filteredCoupons = useMemo(
    () => COUPONS_DATA.filter((item) => item.category === activeTab),
    [activeTab]
  );

  const handleToggleExpand = (id: string) => {
    setCollapsedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleApplyCoupon = (coupon: CouponItem) => {
    toast.success(`${coupon.code} applied to your account!`, 'Coupon Applied');
  };

  return (
    <ScreenProvider
      hiddenStatusBar={false}
      statusBarStyle="dark-content"
      statusBarBackgroundColor="#FFFFFF"
      backgroundColor="#FFFFFF"
      safeArea={true}
      edges={['top', 'bottom']}
      scrollable={false}
      className="flex-1 bg-white"
    >
      <View className="flex-1 bg-white">
        {/* Top Header */}
        <View className="flex-row items-center justify-between px-4 pt-3 pb-3">
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            className="w-10 h-10 items-center justify-center rounded-full active:bg-slate-100"
            accessibilityLabel="Go back"
          >
            <Icon
              name="arrow-back"
              type="Ionicons"
              size={24}
              color={BrandColors.secondary.DEFAULT}
            />
          </TouchableOpacity>
          <Text
            weight="bold"
            className="text-lg text-slate-900 tracking-wide"
          >
            Offers
          </Text>
          <View className="w-10" />
        </View>
        <View className="flex-row border-b border-slate-200 px-4 mt-2">
          {COUPON_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.75}
                onPress={() => setActiveTab(tab.id)}
                className="flex-1 items-center pb-3 pt-2 relative"
              >
                <Text
                  weight={isActive ? 'semibold' : 'regular'}
                  className={`text-[15px] ${isActive ? 'text-secondary' : 'text-slate-500'
                    }`}
                >
                  {tab.label}
                </Text>

                {isActive && (
                  <View className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-primary rounded-full" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Coupons List */}
        <ScrollView
          className="flex-1 bg-white"
          contentContainerClassName="px-4 pt-5 pb-10 gap-5"
          showsVerticalScrollIndicator={false}
        >
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                isExpanded={!collapsedIds[coupon.id]}
                onToggleExpand={handleToggleExpand}
                onApply={handleApplyCoupon}
              />
            ))
          ) : (
            <View className="items-center justify-center py-16 px-6">
              <View className="w-16 h-16 rounded-full bg-secondary-50 items-center justify-center mb-4">
                <Icon
                  name="brightness-percent"
                  type="MaterialCommunityIcons"
                  size={30}
                  color={BrandColors.secondary.DEFAULT}
                />
              </View>
              <Text weight="semibold" className="text-base text-slate-800">
                No Coupons Available
              </Text>
              <Text className="text-xs text-slate-500 text-center mt-1">
                Check back soon for new charging and wallet offers.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenProvider>
  );
};

export default OffersScreen;
