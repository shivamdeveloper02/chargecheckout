import Icon from '@/components/Icon';
import { BrandColors } from '@/constants/theme';
import type { CustomHeaderProps, CustomHeaderVariant } from '@/types';
import { goBack } from '@/utils';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text';

const variantConfig: Record<
    CustomHeaderVariant,
    {
        containerClass: string;
        titleClass: string;
        subtitleClass: string;
        iconColor: string;
        buttonActiveClass: string;
        borderClass: string;
    }
> = {
    default: {
        containerClass: 'bg-white',
        titleClass: 'text-slate-900',
        subtitleClass: 'text-slate-500',
        iconColor: BrandColors.secondary.DEFAULT,
        buttonActiveClass: 'active:bg-slate-100',
        borderClass: 'border-b border-slate-100',
    },
    secondary: {
        containerClass: 'bg-secondary',
        titleClass: 'text-white',
        subtitleClass: 'text-primary-100',
        iconColor: '#FFFFFF',
        buttonActiveClass: 'active:bg-white/10',
        borderClass: 'border-b border-white/10',
    },
    primary: {
        containerClass: 'bg-primary',
        titleClass: 'text-white',
        subtitleClass: 'text-white/85',
        iconColor: '#FFFFFF',
        buttonActiveClass: 'active:bg-white/15',
        borderClass: 'border-b border-white/15',
    },
    dark: {
        containerClass: 'bg-dark',
        titleClass: 'text-white',
        subtitleClass: 'text-slate-400',
        iconColor: '#FFFFFF',
        buttonActiveClass: 'active:bg-white/10',
        borderClass: 'border-b border-dark-border',
    },
    transparent: {
        containerClass: 'bg-transparent',
        titleClass: 'text-slate-900',
        subtitleClass: 'text-slate-500',
        iconColor: BrandColors.secondary.DEFAULT,
        buttonActiveClass: 'active:bg-slate-100/60',
        borderClass: 'border-b border-slate-200/60',
    },
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
    title,
    subtitle,
    titleAlign = 'center',
    titleWeight = 'medium',
    titleColor,
    titleClassName = '',
    subtitleClassName = '',
    titleStyle,
    variant = 'default',
    backgroundColor,
    bordered = false,
    elevated = false,
    showBackButton = true,
    onBackPress,
    fallbackRoute,
    backIconName = 'arrow-back',
    backIconType = 'Ionicons',
    backIconSize = 24,
    backIconColor,
    backButtonClassName = '',
    leftComponent,
    centerComponent,
    rightComponent,
    rightIconName,
    rightIconType = 'Ionicons',
    rightIconSize = 22,
    rightIconColor,
    onRightPress,
    rightButtonClassName = '',
    rightBadge,
    className = '',
    style,
}) => {
    const currentVariant = variantConfig[variant] ?? variantConfig.default;
    const resolvedBackIconColor = backIconColor ?? currentVariant.iconColor;
    const resolvedRightIconColor = rightIconColor ?? currentVariant.iconColor;

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
            return;
        }
        goBack(fallbackRoute);
    };

    const renderLeft = () => {
        if (leftComponent !== undefined) {
            return leftComponent;
        }

        if (!showBackButton) {
            return titleAlign === 'center' ? <View className="w-10 h-10" /> : null;
        }

        return (
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleBack}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                className={`w-10 h-10 items-center justify-center rounded-full ${currentVariant.buttonActiveClass} ${backButtonClassName}`}
                accessibilityRole="button"
                accessibilityLabel="Go back"
            >
                <Icon
                    name={backIconName}
                    type={backIconType}
                    size={backIconSize}
                    color={resolvedBackIconColor}
                />
            </TouchableOpacity>
        );
    };

    const renderCenter = () => {
        if (centerComponent !== undefined) {
            return (
                <View
                    className={`flex-1 ${titleAlign === 'center' ? 'items-center' : 'items-start'
                        } justify-center px-2`}
                >
                    {centerComponent}
                </View>
            );
        }

        if (!title && !subtitle) {
            return <View className="flex-1" />;
        }

        return (
            <View
                className={`flex-1 ${titleAlign === 'center'
                    ? 'items-center'
                    : showBackButton || leftComponent
                        ? 'items-start pl-2'
                        : 'items-start'
                    } justify-center px-2`}
            >
                {title ? (
                    <Text
                        weight={titleWeight}
                        numberOfLines={1}
                        style={[titleColor ? { color: titleColor } : undefined, titleStyle]}
                        className={`text-[18px] tracking-wide ${currentVariant.titleClass} ${titleClassName}`}
                    >
                        {title}
                    </Text>
                ) : null}
                {subtitle ? (
                    <Text
                        weight="regular"
                        numberOfLines={1}
                        className={`text-xs mt-0.5 ${currentVariant.subtitleClass} ${subtitleClassName}`}
                    >
                        {subtitle}
                    </Text>
                ) : null}
            </View>
        );
    };

    const renderRight = () => {
        if (rightComponent !== undefined) {
            return <View className="min-w-10 items-end justify-center">{rightComponent}</View>;
        }

        if (rightIconName) {
            return (
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={onRightPress}
                    disabled={!onRightPress}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    className={`w-10 h-10 items-center justify-center rounded-full relative ${currentVariant.buttonActiveClass} ${rightButtonClassName}`}
                    accessibilityRole="button"
                >
                    <Icon
                        name={rightIconName}
                        type={rightIconType}
                        size={rightIconSize}
                        color={resolvedRightIconColor}
                    />
                    {rightBadge ? (
                        typeof rightBadge === 'boolean' ? (
                            <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-[1.5px] border-white" />
                        ) : (
                            <View className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-primary rounded-full items-center justify-center border border-white">
                                <Text weight="bold" className="text-[9px] text-white">
                                    {rightBadge}
                                </Text>
                            </View>
                        )
                    ) : null}
                </TouchableOpacity>
            );
        }

        return titleAlign === 'center' ? <View className="w-10 h-10" /> : null;
    };

    return (
        <View
            style={[backgroundColor ? { backgroundColor } : undefined, style]}
            className={`flex-row items-center justify-between px-4 pt-3 pb-3 ${currentVariant.containerClass
                } ${bordered ? currentVariant.borderClass : ''} ${elevated ? 'shadow-xs' : ''
                } ${className}`}
        >
            {renderLeft()}
            {renderCenter()}
            {renderRight()}
        </View>
    );
};

export default CustomHeader;
