import Icon from '@/components/Icon';
import Modal from '@/components/Modal';
import type { ImagePickerProps, SheetOptionProps } from '@/types';
import { pickImageFromLibrary, takePhoto } from '@/utils/permission-function';
import { Image, type ImageSource } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import Text from '../Text';

/**
 * circle  -> fully round (avatar)
 * square  -> sharp corners
 * rounded -> soft corners, radius controlled by `borderRadius`
 */
const normalizeSource = (source: ImagePickerProps['source']): ImageSource | number | null => {
    if (source === null || source === undefined || source === '') return null;
    if (typeof source === 'string') return { uri: source };
    return source;
};

const ImagePicker: React.FC<ImagePickerProps> = ({
    source,
    variant = 'circle',
    size = 80,
    width,
    height,
    borderRadius = 12,
    borderWidth = 0,
    borderColor = '#E2E8F0',
    resizeMode = 'cover',
    placeholderIcon = 'person',
    editable = false,
    onImageChange,
    allowRemove = false,
    pickerOptions,
    onPress,
    className = '',
    style,
    title = "Profile photo",
    description = "Choose how you want to add a photo",
}) => {
    const [hasError, setHasError] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);

    const w = width ?? size;
    const h = height ?? size;

    const radius =
        variant === 'circle' ? Math.min(w, h) / 2 : variant === 'square' ? 0 : borderRadius;

    const resolved = normalizeSource(source);
    const showImage = !!resolved && !hasError;

    const closeSheet = () => setSheetOpen(false);

    const handlePickImage = useCallback(
        async (kind: 'camera' | 'library') => {
            // Close the sheet first so permission/system dialogs aren't hidden behind the modal.
            setSheetOpen(false);
            // Wait for the modal to finish dismissing (iOS cannot present two UIs at once).
            await new Promise((resolve) => setTimeout(resolve, 400));

            const image =
                kind === 'camera'
                    ? await takePhoto({ aspect: [w, h], ...pickerOptions })
                    : await pickImageFromLibrary({ aspect: [w, h], ...pickerOptions });

            if (image) {
                setHasError(false);
                onImageChange?.(image);
            }
        },
        [h, w, onImageChange, pickerOptions],
    );

    const handlePress = () => {
        if (editable) setSheetOpen(true);
        else onPress?.();
    };

    const iconSize = Math.max(16, Math.min(w, h) * 0.45);
    const badgeSize = Math.max(22, Math.min(w, h) * 0.28);

    const content = (
        <View
            className={`items-center justify-center overflow-hidden bg-slate-100 ${className}`}
            style={[
                { width: w, height: h, borderRadius: radius, borderWidth, borderColor },
                style,
            ]}
        >
            {showImage ? (
                <Image
                    source={resolved}
                    style={{ width: '100%', height: '100%' }}
                    contentFit={resizeMode}
                    transition={150}
                    onError={() => setHasError(true)}
                />
            ) : (
                <Icon name={placeholderIcon} size={iconSize} color="#94A3B8" />
            )}
        </View>
    );

    return (
        <>
            {editable || onPress ? (
                <Pressable
                    onPress={handlePress}
                    accessibilityRole="button"
                    accessibilityLabel={editable ? 'Change photo' : 'Image'}
                    style={{ width: w, height: h }}
                >
                    {content}
                    {editable && (
                        <View
                            className="absolute items-center justify-center rounded-full border-2 border-white bg-[#004586]"
                            style={{
                                width: badgeSize,
                                height: badgeSize,
                                right: variant === 'circle' ? 0 : 4,
                                bottom: variant === 'circle' ? 0 : 4,
                            }}
                        >
                            <Icon name="camera" size={badgeSize * 0.55} color="#FFFFFF" />
                        </View>
                    )}
                </Pressable>
            ) : (
                content
            )}

            {editable && (
                <Modal isOpen={sheetOpen} onClose={closeSheet} position="bottom">
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                        <Modal.Description>{description}</Modal.Description>
                    </Modal.Header>
                    <View className="px-5 pb-3 pt-2">
                        <SheetOption
                            icon="camera-outline"
                            label="Take photo"
                            onPress={() => handlePickImage('camera')}
                        />
                        <SheetOption
                            icon="images-outline"
                            label="Choose from gallery"
                            onPress={() => handlePickImage('library')}
                        />
                        {allowRemove && !!resolved && (
                            <SheetOption
                                icon="trash-outline"
                                label="Remove photo"
                                destructive
                                onPress={() => {
                                    closeSheet();
                                    setHasError(false);
                                    onImageChange?.(null);
                                }}
                            />
                        )}
                    </View>
                </Modal>
            )}
        </>
    );
};

const SheetOption: React.FC<SheetOptionProps> = ({ icon, label, destructive, onPress }) => (
    <Pressable
        onPress={onPress}
        className="flex-row items-center gap-3 rounded-xl px-2 py-3 active:bg-slate-100"
    >
        <Icon name={icon} size={22} color={destructive ? '#E11D48' : '#004586'} />
        <Text
            weight="medium"
            className={`text-sm ${destructive ? 'text-rose-600' : 'text-slate-800'}`}
        >
            {label}
        </Text>
    </Pressable>
);

export default ImagePicker;

