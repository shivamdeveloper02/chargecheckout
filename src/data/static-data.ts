import { MenuItem } from "@/types";

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
