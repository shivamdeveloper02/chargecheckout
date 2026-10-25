import '@/global.css';
import { Platform } from 'react-native';

export const BrandColors = {
  primary: {
    DEFAULT: '#00D06C',
    light: '#2BE087',
    dark: '#00B25C',
    subtle: '#E8FAF1',
    glow: 'rgba(0, 208, 108, 0.25)',
  },
  secondary: {
    DEFAULT: '#0A3D91',
    light: '#1D53B3',
    dark: '#083277',
    subtle: '#EFF4FC',
    glow: 'rgba(10, 61, 145, 0.25)',
  },
  teal: {
    DEFAULT: '#0090B8',
    light: '#00A8D6',
    dark: '#007696',
  },
  dark: {
    background: '#0A0F1D',
    card: '#141D30',
    cardBorder: '#1E2B45',
    textSecondary: '#94A3B8',
  },
  light: {
    background: '#FFFFFF',
    card: '#F8FAFC',
    cardBorder: '#E2E8F0',
    textSecondary: '#64748B',
  },
  gradients: {
    // Arc 1: Green -> Teal (Matches Charging 'C')
    chargingArc: ['#00D06C', '#0090B8'] as const,
    // Arc 2: Teal -> Royal Blue
    blend: ['#0090B8', '#0A3D91'] as const,
    // Brand Full: Green -> Blue
    fullBrand: ['#00D06C', '#0090B8', '#0A3D91'] as const,
  },
} as const;

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#FFFFFF',
    backgroundElement: '#F1F5F9',
    backgroundSelected: '#E2E8F0',
    textSecondary: '#64748B',
    primary: BrandColors.primary.DEFAULT,
    secondary: BrandColors.secondary.DEFAULT,
  },
  dark: {
    text: '#FFFFFF',
    background: BrandColors.dark.background,
    backgroundElement: BrandColors.dark.card,
    backgroundSelected: '#1E2B45',
    textSecondary: BrandColors.dark.textSecondary,
    primary: BrandColors.primary.DEFAULT,
    secondary: BrandColors.secondary.DEFAULT,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'Poppins-Regular',
    serif: 'serif',
    rounded: 'Poppins-Regular',
    mono: 'ui-monospace',
    medium: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    extrabold: 'Poppins-ExtraBold',
  },
  default: {
    sans: 'Poppins-Regular',
    serif: 'serif',
    rounded: 'Poppins-Regular',
    mono: 'monospace',
    medium: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    extrabold: 'Poppins-ExtraBold',
  },
  web: {
    sans: 'Poppins, system-ui, sans-serif',
    serif: 'serif',
    rounded: 'Poppins, sans-serif',
    mono: 'var(--font-mono, monospace)',
    medium: 'Poppins-Medium, Poppins, sans-serif',
    semibold: 'Poppins-SemiBold, Poppins, sans-serif',
    bold: 'Poppins-Bold, Poppins, sans-serif',
    extrabold: 'Poppins-ExtraBold, Poppins, sans-serif',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
