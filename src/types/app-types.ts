import type { Colors } from '@/constants/theme';
import type { ROUTES } from '@/utils/navigation';
import type { Ionicons } from '@expo/vector-icons';
import type { IconSetName } from './components-types';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
}

export interface ToastOptions {
    title?: string;
    duration?: number;
}

export type ToastListener = (toasts: ToastItem[]) => void;

export interface MenuItem {
    id: string;
    label: string;
    iconName: string;
    iconType?: IconSetName;
    badge?: string;
    onPress?: () => void;
}

export interface ContactOption {
    id: string;
    label: string;
    iconName: string;
    iconType?: IconSetName;
    action: () => void | Promise<void>;
}

export type CouponCategory = 'my_coupons' | 'charging' | 'wallet';

export interface CouponTab {
    id: CouponCategory;
    label: string;
}

export interface CouponItem {
    id: string;
    code: string;
    title: string;
    subtitle: string;
    badgeTop: string;
    badgeBottom: string;
    category: CouponCategory;
    terms: string[];
}

export type AppRouteKey = keyof typeof ROUTES;
export type AppRoutePath = (typeof ROUTES)[AppRouteKey];
export type NavigationParams = Record<string, string | number | undefined>;

export interface BottomTabsProps {
    state: {
        index: number;
        routes: Array<{
            key: string;
            name: string;
            params?: Record<string, unknown>;
        }>;
    };
    descriptors: Record<
        string,
        {
            options: {
                title?: string;
                tabBarLabel?: string;
                tabBarIcon?: (props: {
                    focused: boolean;
                    color: string;
                    size: number;
                }) => React.ReactNode;
                tabBarBadge?: string | number;
            };
        }
    >;
    navigation: {
        emit: (event: {
            type: string;
            target: string;
            canPreventDefault: boolean;
        }) => { defaultPrevented: boolean };
        navigate: (name: string, params?: Record<string, unknown>) => void;
    };
}

export interface TabConfig {
    name: string;
    label: string;
    activeIcon: keyof typeof Ionicons.glyphMap;
    inactiveIcon: keyof typeof Ionicons.glyphMap;
}

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export type PermissionType = 'camera' | 'photos' | 'location';

export type PermissionResult =
    | 'granted' // ready to use
    | 'denied' // user denied this time, can be asked again
    | 'blocked'; // denied permanently -> must be changed from device settings

export interface PermissionMeta {
    title: string;
    deniedMessage: string;
    blockedMessage: string;
}

export type RawPermission = { granted: boolean; canAskAgain: boolean };

export interface EnsurePermissionOptions {
    showAlert?: boolean;
}

export interface PickedImage {
    uri: string;
    width: number;
    height: number;
    mimeType?: string;
    fileName?: string | null;
}

export interface PickImageOptions {
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
}

export interface SignUpFormData {
    name: string;
    mobile: string;
    email: string;
    password: string;
}

export type SignUpFormField = keyof SignUpFormData;

export interface EditProfileFormData {
    fullName: string;
    mobile: string;
    email: string;
    /** Local file uri / remote url of the avatar, `null` when there is none. */
    image: string | null;
}

export type EditProfileTextField = Exclude<keyof EditProfileFormData, 'image'>;

export type EditProfileErrors = Partial<Record<EditProfileTextField, string>>;
