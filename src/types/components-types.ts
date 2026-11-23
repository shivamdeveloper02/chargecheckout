import type { ImageSource } from 'expo-image';
import type { Href } from 'expo-router';
import type React from 'react';
import type {
    DimensionValue,
    GestureResponderEvent,
    PressableProps,
    TextProps as RNTextProps,
    StatusBarStyle,
    StyleProp,
    TextInputProps,
    TextStyle,
    ViewProps,
    ViewStyle,
} from 'react-native';
import type { AppRoutePath, PickedImage, PickImageOptions } from './app-types';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'border'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'destructive'
    | 'link'
    | 'dark'
    | 'gradient';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    style?: StyleProp<ViewStyle>;
    textClassName?: string;
    textStyle?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    onPress?: (event: GestureResponderEvent) => void;
}

export type CardVariant = 'default' | 'flat' | 'outline' | 'ghost' | 'none';

export interface CardProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
    variant?: CardVariant;
    noPadding?: boolean;
    style?: StyleProp<ViewStyle>;
}

export interface CardHeaderProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export interface CardTitleProps {
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<TextStyle>;
}

export interface CardDescriptionProps {
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<TextStyle>;
}

export interface CardBodyProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
    noPadding?: boolean;
    style?: StyleProp<ViewStyle>;
}

export interface CardFooterProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<ViewStyle>;
}

/**
 * circle  -> fully round (avatar)
 * square  -> sharp corners
 * rounded -> soft corners, radius controlled by `borderRadius`
 */
export type CustomImageVariant = 'circle' | 'square' | 'rounded';

export interface ImagePickerProps {
    /** Remote url, local `require()` asset, or `{ uri }`. */
    source?: ImageSource | string | number | null;
    variant?: CustomImageVariant;
    /** Width & height (px). Ignored for `width`/`height` when those are provided. */
    size?: number;
    width?: number;
    height?: number;
    /** Used by the `rounded` variant. Default 12. */
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    resizeMode?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    /** Icon shown when there is no image (or it failed to load). */
    placeholderIcon?: string;
    /** Lets the user pick a new image from camera / gallery. */
    editable?: boolean;
    /** Called with the picked image. Camera/photos permissions are handled for you. */
    onImageChange?: (image: PickedImage | null) => void;
    /** Show a "Remove photo" option in the sheet (needs `onImageChange`). */
    allowRemove?: boolean;
    pickerOptions?: PickImageOptions;
    onPress?: () => void;
    className?: string;
    style?: StyleProp<ViewStyle>;
    title?: string;
    description?: string;
}

export interface SheetOptionProps {
    icon: string;
    label: string;
    destructive?: boolean;
    onPress: () => void;
}

export type IconSetName =
    | 'Ionicons'
    | 'MaterialIcons'
    | 'MaterialCommunityIcons'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Feather'
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Foundation'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Fontisto';

export interface IconProps {
    name: string;
    type?: IconSetName;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
    className?: string;
    fallback?: React.ReactNode;
}

export interface ModalContextType {
    onClose: () => void;
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
export type ModalPosition = 'top' | 'center' | 'bottom';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: ModalSize;
    position?: ModalPosition;
    topOffset?: string;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    className?: string;
    style?: StyleProp<ViewStyle>;
}

export interface ModalHeaderProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    style?: StyleProp<ViewStyle>;
}

export interface ModalTitleProps {
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<TextStyle>;
    as?: string;
}

export interface ModalDescriptionProps {
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<TextStyle>;
}

export interface ModalBodyProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<ViewStyle>;
}

export interface ModalFooterProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
    style?: StyleProp<ViewStyle>;
}

export interface SkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    className?: string;
    style?: StyleProp<ViewStyle>;
    animate?: boolean;
}

export interface InputProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel';
    required?: boolean;
    disabled?: boolean;
    className?: string;
    style?: StyleProp<TextStyle>;
}

export interface TextareaProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
    hint?: string;
    showCount?: boolean;
    maxLength?: number;
    rows?: number;
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    style?: StyleProp<TextStyle>;
}

export interface DateSelectProps extends Omit<TextInputProps, 'style' | 'onChange'> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    style?: StyleProp<TextStyle>;
    value?: string;
    onChange?: (value: string) => void;
    onPress?: () => void;
}

export interface CheckboxProps {
    label?: React.ReactNode;
    description?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    className?: string;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
}

export interface RadioProps {
    label?: React.ReactNode;
    description?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    className?: string;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
    value?: string;
    name?: string;
}

export interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    label?: string;
    name?: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    direction?: 'horizontal' | 'vertical';
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

export interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
    id?: string;
}

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    label?: string;
    error?: string;
    hint?: string;
    options: (SelectOption | string | number)[];
    value?: string | number;
    onChange?: (value: string | number) => void;
    placeholder?: string;
    leftIcon?: React.ReactNode;
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export interface SearchSelectOption {
    value: string | number;
    label: string;
    subLabel?: string;
    badge?: string;
    badgeColor?: string;
    disabled?: boolean;
}

export interface SearchSelectProps {
    label?: string;
    error?: string;
    hint?: string;
    options: (SearchSelectOption | string | number)[];
    value?: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    leftIcon?: React.ReactNode;
    clearable?: boolean;
    disabled?: boolean;
    required?: boolean;
    searchable?: boolean;
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    className?: string;
    style?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
    noOptionsText?: string;
    id?: string;
}

export interface MultiSelectOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

export interface MultiSelectProps {
    label?: string;
    error?: string;
    hint?: string;
    options: (MultiSelectOption | string)[];
    value?: string[];
    onChange: (selectedValues: string[]) => void;
    placeholder?: string;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    maxDisplayTags?: number;
    containerClassName?: string;
    containerStyle?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
    className?: string;
    style?: StyleProp<ViewStyle>;
}

export type TextWeight =
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';

export interface TextProps extends RNTextProps {
    weight?: TextWeight;
    className?: string;
}

export interface LoadingScreenProps {
    message?: string;
    visible?: boolean;
    overlay?: boolean;
    style?: ViewStyle;
}

export type CustomHeaderVariant =
    | 'default'
    | 'secondary'
    | 'primary'
    | 'dark'
    | 'transparent';

export interface CustomHeaderProps {
    title?: string;
    subtitle?: string;
    titleAlign?: 'center' | 'left';
    titleWeight?: TextWeight;
    titleColor?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    titleStyle?: StyleProp<TextStyle>;
    variant?: CustomHeaderVariant;
    backgroundColor?: string;
    bordered?: boolean;
    elevated?: boolean;
    showBackButton?: boolean;
    onBackPress?: () => void;
    fallbackRoute?: AppRoutePath | Href;
    backIconName?: string;
    backIconType?: IconSetName;
    backIconSize?: number;
    backIconColor?: string;
    backButtonClassName?: string;
    leftComponent?: React.ReactNode;
    centerComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    rightIconName?: string;
    rightIconType?: IconSetName;
    rightIconSize?: number;
    rightIconColor?: string;
    onRightPress?: () => void;
    rightButtonClassName?: string;
    rightBadge?: string | number | boolean;
    className?: string;
    style?: StyleProp<ViewStyle>;
}

export interface ScreenProviderProps {
    children: React.ReactNode;
    statusBarStyle?: StatusBarStyle;
    statusBarBackgroundColor?: string;
    hiddenStatusBar?: boolean;
    translucentStatusBar?: boolean;
    safeArea?: boolean;
    edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
    keyboardAvoiding?: boolean;
    keyboardVerticalOffset?: number;
    dismissKeyboardOnPress?: boolean;
    scrollable?: boolean;
    bounces?: boolean;
    className?: string;
    contentContainerClassName?: string;
    backgroundColor?: string;
    style?: ViewStyle;
    isLoading?: boolean;
    loadingMessage?: string;
    showHeader?: boolean;
    header?: React.ReactNode;
    headerProps?: CustomHeaderProps;
    title?: string;
    subtitle?: string;
    onBackPress?: () => void;
    rightComponent?: React.ReactNode;
}

