import { Icon, toast } from '@/components';
import { ScreenProvider, Text } from '@/components/Reusable';
import { BrandColors } from '@/constants/theme';
import { ContactOption } from '@/types';
import { goBack } from '@/utils';
import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

const CONTACT_OPTIONS: ContactOption[] = [
    {
        id: 'chat',
        label: 'Chat with us',
        iconName: 'chatbubble-ellipses-outline',
        iconType: 'Ionicons',
        action: async () => {
            const whatsappUrl = 'https://wa.me/919555804662?text=Hi%20ChargeCheckout%20Support%2C%20I%20need%20help.';
            const canOpen = await Linking.canOpenURL(whatsappUrl).catch(() => false);
            if (canOpen) {
                await Linking.openURL(whatsappUrl);
            } else {
                toast.info('Connecting you with customer support chat...', 'Chat with us');
            }
        },
    },
    {
        id: 'call',
        label: 'Call us',
        iconName: 'call',
        iconType: 'Ionicons',
        action: async () => {
            const telUrl = 'tel:+919555804662';
            const canOpen = await Linking.canOpenURL(telUrl).catch(() => false);
            if (canOpen) {
                await Linking.openURL(telUrl);
            } else {
                toast.info('Support Helpline: +91 9555804662', 'Call us');
            }
        },
    },
    {
        id: 'write',
        label: 'Write to us',
        iconName: 'pencil-outline',
        iconType: 'MaterialCommunityIcons',
        action: async () => {
            const mailUrl = 'mailto:support@chargecheckout.com?subject=ChargeCheckout%20Support%20Request';
            const canOpen = await Linking.canOpenURL(mailUrl).catch(() => false);
            if (canOpen) {
                await Linking.openURL(mailUrl);
            } else {
                toast.info('Email us at support@chargecheckout.com', 'Write to us');
            }
        },
    },
];

const ContactIllustration: React.FC = () => {
    return (
        <View className="items-center justify-center my-4" style={{ width: 240, height: 195 }}>
            <View
                style={{
                    position: 'absolute',
                    width: 190,
                    height: 156,
                    borderRadius: 95,
                    borderWidth: 1.2,
                    borderColor: 'rgba(255, 255, 255, 0.45)',
                    borderStyle: 'dashed',
                    transform: [{ rotate: '-12deg' }],
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    width: 156,
                    height: 122,
                    borderRadius: 78,
                    borderWidth: 1.2,
                    borderColor: 'rgba(255, 255, 255, 0.35)',
                    borderStyle: 'dashed',
                    transform: [{ rotate: '18deg' }],
                }}
            />
            <View style={{ position: 'absolute', top: 6, left: 16 }}>
                <Text weight="bold" style={{ fontSize: 22, color: '#8CE0FF', lineHeight: 26 }}>
                    @
                </Text>
            </View>
            <View style={{ position: 'absolute', bottom: 26, right: 8 }}>
                <Text weight="bold" style={{ fontSize: 23, color: '#8CE0FF', lineHeight: 27 }}>
                    @
                </Text>
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: 12,
                    left: 58,
                    backgroundColor: '#FF6B81',
                    borderRadius: 4,
                    paddingHorizontal: 6,
                    paddingVertical: 5,
                    width: 36,
                    zIndex: 10,
                }}
            >
                <View style={{ height: 2, backgroundColor: '#1E293B', marginBottom: 2.5, width: '90%' }} />
                <View style={{ height: 2, backgroundColor: '#1E293B', marginBottom: 2.5, width: '100%' }} />
                <View style={{ height: 2, backgroundColor: '#1E293B', width: '75%' }} />
                <View
                    style={{
                        position: 'absolute',
                        bottom: -4,
                        right: 6,
                        width: 0,
                        height: 0,
                        borderLeftWidth: 4,
                        borderRightWidth: 4,
                        borderTopWidth: 5,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: '#FF6B81',
                    }}
                />
            </View>

            {/* Top-Center Light Blue Chat Bubble */}
            <View
                style={{
                    position: 'absolute',
                    top: 26,
                    right: 68,
                    backgroundColor: '#7CC2F5',
                    borderRadius: 4,
                    paddingHorizontal: 6,
                    paddingVertical: 5,
                    width: 38,
                    zIndex: 10,
                }}
            >
                <View style={{ height: 2, backgroundColor: '#0F172A', marginBottom: 2.5, width: '65%' }} />
                <View style={{ height: 2, backgroundColor: '#0F172A', marginBottom: 2.5, width: '100%' }} />
                <View style={{ height: 2, backgroundColor: '#0F172A', width: '85%' }} />
                <View
                    style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 7,
                        width: 0,
                        height: 0,
                        borderLeftWidth: 4,
                        borderRightWidth: 4,
                        borderTopWidth: 5,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: '#7CC2F5',
                    }}
                />
            </View>

            {/* Left Paper Plane */}
            <View
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 20,
                    transform: [{ rotate: '-25deg' }],
                    zIndex: 10,
                }}
            >
                <Icon name="paper-plane" type="Ionicons" size={20} color="#D8F0FF" />
            </View>

            {/* Top-Right Paper Plane */}
            <View
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 14,
                    transform: [{ rotate: '15deg' }],
                    zIndex: 10,
                }}
            >
                <Icon name="paper-plane" type="Ionicons" size={24} color="#FFFFFF" />
            </View>

            {/* Central Open Envelope & Document */}
            <View style={{ alignItems: 'center', marginTop: 18 }}>
                {/* Envelope Upper Open Flap Triangle */}
                <View
                    style={{
                        width: 0,
                        height: 0,
                        borderLeftWidth: 64,
                        borderRightWidth: 64,
                        borderBottomWidth: 38,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: '#E58D7E',
                        marginBottom: -4,
                    }}
                />

                {/* Document Rising Inside Envelope */}
                <View
                    style={{
                        width: 98,
                        height: 76,
                        backgroundColor: '#061D49',
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        paddingHorizontal: 10,
                        paddingTop: 10,
                        marginTop: -26,
                        zIndex: 2,
                        borderWidth: 1,
                        borderColor: 'rgba(91, 168, 230, 0.3)',
                    }}
                >
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((line) => (
                        <View
                            key={line}
                            style={{
                                height: 2.5,
                                backgroundColor: '#56A7E6',
                                borderRadius: 2,
                                marginBottom: 4.5,
                                width: line === 0 ? '55%' : '100%',
                            }}
                        />
                    ))}
                </View>

                {/* Envelope Front Body */}
                <View
                    style={{
                        width: 128,
                        height: 68,
                        backgroundColor: '#F3A695',
                        borderBottomLeftRadius: 6,
                        borderBottomRightRadius: 6,
                        marginTop: -30,
                        zIndex: 3,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    {/* Inner dark V-cut at top of envelope front */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            width: 0,
                            height: 0,
                            borderLeftWidth: 64,
                            borderRightWidth: 64,
                            borderTopWidth: 28,
                            borderLeftColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderTopColor: '#072257',
                        }}
                    />

                    {/* Bottom Fold Triangle */}
                    <View
                        style={{
                            width: 0,
                            height: 0,
                            borderLeftWidth: 64,
                            borderRightWidth: 64,
                            borderBottomWidth: 42,
                            borderLeftColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderBottomColor: '#DF8B7B',
                        }}
                    />
                </View>
            </View>

            {/* Bottom-Left Pink Chat Bubble */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 42,
                    left: 16,
                    backgroundColor: '#FF6B81',
                    borderRadius: 4,
                    paddingHorizontal: 7,
                    paddingVertical: 6,
                    width: 42,
                    zIndex: 10,
                }}
            >
                <View style={{ height: 2, backgroundColor: '#1E293B', marginBottom: 3, width: '55%' }} />
                <View style={{ height: 2, backgroundColor: '#1E293B', marginBottom: 3, width: '100%' }} />
                <View style={{ height: 2, backgroundColor: '#1E293B', marginBottom: 3, width: '100%' }} />
                <View style={{ height: 2, backgroundColor: '#1E293B', width: '80%' }} />
                <View
                    style={{
                        position: 'absolute',
                        bottom: -5,
                        left: 8,
                        width: 0,
                        height: 0,
                        borderLeftWidth: 4,
                        borderRightWidth: 4,
                        borderTopWidth: 6,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: '#FF6B81',
                    }}
                />
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 46,
                    transform: [{ rotate: '12deg' }],
                    zIndex: 10,
                }}
            >
                <Icon name="paper-plane" type="Ionicons" size={22} color="#FFFFFF" />
            </View>
        </View>
    );
};

const ContactUsScreen: React.FC = () => {
    return (
        <ScreenProvider
            hiddenStatusBar={false}
            statusBarStyle="light-content"
            statusBarBackgroundColor={BrandColors.secondary.DEFAULT}
            backgroundColor={BrandColors.secondary.DEFAULT}
            safeArea={true}
            edges={['top']}
            scrollable={false}
            className="flex-1"
        >
            <View className="flex-1 bg-secondary">
                <View className="flex-row items-center justify-between px-4 pt-3 pb-2">
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => goBack()}
                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                        className="w-10 h-10 items-center justify-center rounded-full"
                        accessibilityLabel="Go back"
                    >
                        <Icon name="arrow-back" type="Ionicons" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text weight="bold" className="text-[19px] text-white tracking-wide">
                        Contact us
                    </Text>
                    <View className="w-10" />
                </View>
                <View className="items-center justify-center py-3">
                    <ContactIllustration />
                </View>
                <View className="flex-1 bg-white rounded-t-[30px] px-5 pt-8 pb-8 mt-2">
                    <View className="items-center px-2">
                        <Text weight="bold" className="text-[17px] text-slate-900 text-center">
                            How do you wish to Contact us?
                        </Text>
                        <Text className="text-xs text-slate-500 text-center leading-5 mt-2.5">
                            Tell us your preferred mode of communication.{'\n'}
                            Our customer support team will reach out to you shortly.
                        </Text>
                    </View>
                    <View className="mt-7 gap-4">
                        {CONTACT_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                activeOpacity={0.75}
                                onPress={option.action}
                                className="flex-row items-center bg-white rounded-2xl py-4 px-4 border border-secondary/60 border-l-[3.5px] border-l-secondary shadow-xs"
                            >
                                <View className="w-8 items-center justify-center mr-3">
                                    <Icon
                                        name={option.iconName}
                                        type={option.iconType || 'Ionicons'}
                                        size={22}
                                        color="#475569"
                                    />
                                </View>
                                <Text weight="medium" className="text-[14px] text-slate-700">
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </ScreenProvider>
    );
};

export default ContactUsScreen;
