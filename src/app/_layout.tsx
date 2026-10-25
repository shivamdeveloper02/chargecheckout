import { ToastContainer } from '@/components/Toast';
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../global.css';

// Keep the splash screen visible while fonts and assets load
SplashScreen.preventAutoHideAsync().catch(() => {
  // Splash screen might already be hidden or not supported in current environment
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins: Poppins_400Regular,
    'Poppins-Thin': Poppins_100Thin,
    'Poppins-ExtraLight': Poppins_200ExtraLight,
    'Poppins-Light': Poppins_300Light,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-ExtraBold': Poppins_800ExtraBold,
    'Poppins-Black': Poppins_900Black,
    'Poppins-Italic': Poppins_400Regular_Italic,
    'Poppins-MediumItalic': Poppins_500Medium_Italic,
    'Poppins-SemiBoldItalic': Poppins_600SemiBold_Italic,
    'Poppins-BoldItalic': Poppins_700Bold_Italic,
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => { });
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
          animation: 'fade',
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="forgot-password" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding" options={{ animation: 'slide_from_right' }} />
      </Stack>
      <ToastContainer />
    </>
  );
}
