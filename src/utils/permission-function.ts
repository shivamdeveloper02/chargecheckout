import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Alert, Linking, Platform } from 'react-native';
import type { PermissionType, PermissionResult, PermissionMeta, RawPermission, EnsurePermissionOptions as EnsureOptions, PickedImage, PickImageOptions } from '@/types';
export type { PermissionType, PermissionResult, PickedImage, PickImageOptions } from '@/types';

 // denied permanently -> must be changed from device settings

const PERMISSION_META: Record<PermissionType, PermissionMeta> = {
    camera: {
        title: 'Camera Permission',
        deniedMessage: 'Camera access is needed to take a photo.',
        blockedMessage:
            'Camera access is turned off. Please enable it from Settings > Permissions > Camera.',
    },
    photos: {
        title: 'Photos Permission',
        deniedMessage: 'Photo library access is needed to choose an image.',
        blockedMessage:
            'Photo access is turned off. Please enable it from Settings > Permissions > Photos.',
    },
    location: {
        title: 'Location Permission',
        deniedMessage: 'Location access is needed to find chargers near you.',
        blockedMessage:
            'Location access is turned off. Please enable it from Settings > Permissions > Location.',
    },
};

/** Opens this app's page in the system settings. */
export const openAppSettings = async (): Promise<void> => {
    try {
        if (Platform.OS === 'web') return;
        await Linking.openSettings();
    } catch {
        Alert.alert('Unable to open settings', 'Please open your device settings manually.');
    }
};

/** Alert that sends the user to the settings screen after a permanent denial. */
export const showSettingsAlert = (type: PermissionType): void => {
    const meta = PERMISSION_META[type];
    Alert.alert(meta.title, meta.blockedMessage, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: openAppSettings },
    ]);
};

/** Alert shown after a (non permanent) denial, offering to try again. */
const showRetryAlert = (type: PermissionType, onRetry: () => void): void => {
    const meta = PERMISSION_META[type];
    Alert.alert(meta.title, meta.deniedMessage, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Try Again', onPress: onRetry },
    ]);
};

const toResult = (res: RawPermission): PermissionResult =>
    res.granted ? 'granted' : res.canAskAgain ? 'denied' : 'blocked';

const permissionApi: Record<
    PermissionType,
    { get: () => Promise<RawPermission>; request: () => Promise<RawPermission> }
> = {
    camera: {
        get: () => ImagePicker.getCameraPermissionsAsync(),
        request: () => ImagePicker.requestCameraPermissionsAsync(),
    },
    photos: {
        get: () => ImagePicker.getMediaLibraryPermissionsAsync(),
        request: () => ImagePicker.requestMediaLibraryPermissionsAsync(),
    },
    location: {
        get: () => Location.getForegroundPermissionsAsync(),
        request: () => Location.requestForegroundPermissionsAsync(),
    },
};

/** Read the current status without prompting the user. */
export const checkPermission = async (type: PermissionType): Promise<PermissionResult> => {
    try {
        return toResult(await permissionApi[type].get());
    } catch {
        return 'denied';
    }
};

/**
 * Makes sure a permission is granted.
 *  - already granted        -> true
 *  - not asked yet          -> shows the system prompt
 *  - denied (can ask again) -> prompt again / offers "Try Again"
 *  - denied permanently     -> "Open Settings" alert
 * Resolves `true` only if the permission is granted.
 */
export const ensurePermission = async (
    type: PermissionType,
    { showAlert = true }: EnsureOptions = {},
): Promise<boolean> => {
    try {
        const api = permissionApi[type];
        let result = toResult(await api.get());
        if (result === 'granted') return true;
        if (result === 'denied') {
            result = toResult(await api.request());
            if (result === 'granted') return true;
        }
        if (showAlert) {
            if (result === 'blocked') showSettingsAlert(type);
            else showRetryAlert(type, () => void ensurePermission(type, { showAlert }));
        }
        return false;
    } catch {
        if (showAlert)
            Alert.alert(
                PERMISSION_META[type].title,
                'Something went wrong. Please try again.',
            );
        return false;
    }
};

export const requestCameraPermission = () => ensurePermission('camera');
export const requestPhotosPermission = () => ensurePermission('photos');
export const requestLocationPermission = () => ensurePermission('location');

/**
 * Returns the current location after making sure permission and device
 * location services are on. Returns `null` when unavailable.
 */
export const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
    if (!(await ensurePermission('location'))) return null;
    const servicesEnabled = await Location.hasServicesEnabledAsync();
    if (!servicesEnabled) {
        Alert.alert('Location is off', 'Please turn on location services (GPS) on your device.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openAppSettings },
        ]);
        return null;
    }
    try {
        return await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
        });
    } catch {
        Alert.alert('Location error', 'Unable to fetch your location. Please try again.');
        return null;
    }
};

const defaultPickOptions: Required<PickImageOptions> = {
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
};

const toPickedImage = (result: ImagePicker.ImagePickerResult): PickedImage | null => {
    if (result.canceled || !result.assets?.length) return null;
    const { uri, width, height, mimeType, fileName } = result.assets[0];
    return { uri, width, height, mimeType, fileName };
};

/** Takes a photo with the camera (handles permission). `null` if cancelled/denied. */
export const takePhoto = async (options?: PickImageOptions): Promise<PickedImage | null> => {
    if (!(await ensurePermission('camera'))) return null;
    try {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            ...defaultPickOptions,
            ...options,
        });
        return toPickedImage(result);
    } catch {
        Alert.alert('Camera error', 'Unable to open the camera. Please try again.');
        return null;
    }
};

/** Picks an image from the gallery (handles permission). `null` if cancelled/denied. */
export const pickImageFromLibrary = async (
    options?: PickImageOptions,
): Promise<PickedImage | null> => {
    if (!(await ensurePermission('photos'))) return null;
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            ...defaultPickOptions,
            ...options,
        });
        return toPickedImage(result);
    } catch {
        Alert.alert('Gallery error', 'Unable to open your photos. Please try again.');
        return null;
    }
};