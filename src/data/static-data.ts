import { CouponItem, CouponTab, MenuItem } from "@/types";

export const MANAGE_ITEMS: MenuItem[] = [
    {
        id: 'devices',
        label: 'Devices',
        iconName: 'ev-station',
        iconType: 'MaterialCommunityIcons',
        badge: 'New',
    },
    {
        id: 'vehicle',
        label: 'Vehicle',
        iconName: 'car-outline',
        iconType: 'Ionicons',
    },
    {
        id: 'rfid',
        label: 'RFID',
        iconName: 'card-account-details-outline',
        iconType: 'MaterialCommunityIcons',
    },
    {
        id: 'flux',
        label: 'Flux',
        iconName: 'flash-outline',
        iconType: 'Ionicons',
    },
];

export const STATION_ITEMS: MenuItem[] = [
    {
        id: 'list-charger',
        label: 'List a Charger',
        iconName: 'power-plug-outline',
        iconType: 'MaterialCommunityIcons',
    },
    {
        id: 'restricted-stations',
        label: 'Restricted Stations',
        iconName: 'shield-lock-outline',
        iconType: 'MaterialCommunityIcons',
    },
    {
        id: 'favourite-stations',
        label: 'Restricted Stations',
        iconName: 'lock-outline',
        iconType: 'MaterialCommunityIcons',
    },
];

export const SHOP_ITEMS: MenuItem[] = [
    {
        id: 'orders',
        label: 'Orders',
        iconName: 'cube-outline',
        iconType: 'Ionicons',
    },
    {
        id: 'shipping-addresses',
        label: 'Saved Shipping Addresses',
        iconName: 'location-outline',
        iconType: 'Ionicons',
    },
    {
        id: 'saved-trips',
        label: 'Saved Trips',
        iconName: 'map-marker-path',
        iconType: 'MaterialCommunityIcons',
    },
    {
        id: 'stickers',
        label: 'Stickers',
        iconName: 'layers-outline',
        iconType: 'Ionicons',
    },
    {
        id: 'refer-earn',
        label: 'Refer and Earn',
        iconName: 'people-outline',
        iconType: 'Ionicons',
    },
];

export const ACCOUNT_ITEMS: MenuItem[] = [
    {
        id: 'account-privacy',
        label: 'Account Privacy',
        iconName: 'account-cog-outline',
        iconType: 'MaterialCommunityIcons',
    },
    {
        id: 'notifications',
        label: 'Notifications',
        iconName: 'notifications-outline',
        iconType: 'Ionicons',
    },
    {
        id: 'devices-logged-in',
        label: 'Devices logged in',
        iconName: 'phone-portrait-outline',
        iconType: 'Ionicons',
    },
    {
        id: 'logout',
        label: 'Logout',
        iconName: 'log-out-outline',
        iconType: 'Ionicons',
    },
];

export const COUPON_TABS: CouponTab[] = [
    { id: 'my_coupons', label: 'My coupons' },
    { id: 'charging', label: 'Charging' },
    { id: 'wallet', label: 'Wallet' },
];

export const COUPONS_DATA: CouponItem[] = [
    {
        id: 'free-100',
        code: 'FREE100',
        title: 'FREE100',
        subtitle: 'Get Flat 100% OFF on Charging Sessions',
        badgeTop: '100',
        badgeBottom: '% OFF',
        category: 'my_coupons',
        terms: [
            'Get Flat 100% OFF on Charging Sessions',
            'Applicable on this Charger Only',
            'Terms and Conditions may apply',
        ],
    },
    {
        id: 'flat-100-off',
        code: 'FLAT100',
        title: 'Flat 100% OFF',
        subtitle: 'Get 100% OFF on charging Session',
        badgeTop: '100',
        badgeBottom: '% OFF',
        category: 'my_coupons',
        terms: [
            'Get 100% OFF on charging Session',
            'Applicable only on this charger',
            'Terms and condition may apply',
        ],
    },
    {
        id: 'ev-green-50',
        code: 'EVGREEN50',
        title: 'EVGREEN50',
        subtitle: 'Get Flat 50% OFF up to ₹150 on Fast Charging',
        badgeTop: '50%',
        badgeBottom: 'OFF',
        category: 'charging',
        terms: [
            'Get 50% instant discount up to ₹150 on DC fast chargers',
            'Minimum charging session value of ₹199 required',
            'Terms and Conditions may apply',
        ],
    },
    {
        id: 'first-charge',
        code: 'FIRSTCHARGE',
        title: 'FIRSTCHARGE',
        subtitle: 'Get Flat ₹100 OFF on your first EV charging session',
        badgeTop: '₹100',
        badgeBottom: 'OFF',
        category: 'charging',
        terms: [
            'Flat ₹100 discount on your first charging session',
            'Applicable across all AC & DC ChargeCheckout hubs',
            'Terms and Conditions may apply',
        ],
    },
    {
        id: 'wallet-bonus',
        code: 'WALLETBONUS',
        title: 'WALLETBONUS',
        subtitle: 'Get 10% Extra Credits on Wallet Recharge above ₹500',
        badgeTop: '10%',
        badgeBottom: 'BONUS',
        category: 'wallet',
        terms: [
            'Recharge wallet with ₹500 or more to get 10% bonus credits',
            'Maximum bonus credits capped at ₹100 per transaction',
            'Terms and Conditions may apply',
        ],
    },
    {
        id: 'miles-cash-50',
        code: 'MILESCASH50',
        title: 'Flat ₹50 Cashback',
        subtitle: 'Get ₹50 Cashback on Wallet Top-up of ₹1,000+',
        badgeTop: '₹50',
        badgeBottom: 'CASH',
        category: 'wallet',
        terms: [
            'Instant ₹50 cashback credited to ChargeCheckout Wallet',
            'Valid on UPI and Card wallet recharges above ₹1,000',
            'Terms and Conditions may apply',
        ],
    },
];
