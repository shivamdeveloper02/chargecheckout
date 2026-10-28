import { Redirect } from 'expo-router';
import React from 'react';
/**
 * ChargeCheckout Home Screen route.
 * Redirects directly into the bottom tab navigator where
 * Map is configured as the primary Home Screen.
 */
const HomeScreen: React.FC = () => {
  return <Redirect href="/(tabs)" />;
}
export default HomeScreen