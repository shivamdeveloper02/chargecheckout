import type { AppRoutePath, NavigationParams } from '@/types';
import { router, type Href } from 'expo-router';
export type { AppRouteKey, AppRoutePath, NavigationParams } from '@/types';

export const ROUTES = {
  SPLASH: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/home',
  TABS: '/(tabs)',
  MAP: '/(tabs)',
  CHARGER: '/(tabs)/charger',
  WALLET: '/(tabs)/wallet',
  PROFILE: '/(tabs)/profile',
  CONTACTUS: '/contact-us',
  OFFERS: '/offers',
  EDITPROFILE: '/edit-profile',
  REFERANDEARN: '/refer-and-earn',
  ABOUT: '/about',
  FAQ: '/faq',
  PRIVACYPOLICY: '/privacy-policy',
  TERMSANDCONDITIONS: '/terms-and-conditions',
} as const;

const resolveHref = (
  pathname: AppRoutePath | Href,
  params?: NavigationParams
): Href => {
  if (!params || Object.keys(params).length === 0) {
    return pathname as Href;
  }
  return {
    pathname: pathname as string,
    params,
  } as unknown as Href;
};

// Navigate to a screen (uses expo-router navigate, avoiding duplicate stack entries when possible)
export const navigateTo = (
  pathname: AppRoutePath | Href,
  params?: NavigationParams
): void => {
  router.navigate(resolveHref(pathname, params));
};

// Push a new screen onto the navigation stack
export const pushTo = (
  pathname: AppRoutePath | Href,
  params?: NavigationParams
): void => {
  router.push(resolveHref(pathname, params));
};

// Replace the current screen in the navigation stack
export const replaceWith = (
  pathname: AppRoutePath | Href,
  params?: NavigationParams
): void => {
  router.replace(resolveHref(pathname, params));
};

// Go back to the previous screen, or fallback to a target route if there is no history
export const goBack = (fallbackRoute: AppRoutePath | Href = ROUTES.TABS): void => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackRoute as Href);
  }
};

// Dismiss all screens in the stack and replace with the target route
export const resetTo = (pathname: AppRoutePath | Href = ROUTES.LOGIN): void => {
  if (router.canDismiss()) {
    router.dismissAll();
  }
  router.replace(pathname as Href);
};

// Check if the router can go back
export const canGoBack = (): boolean => {
  return router.canGoBack();
};

// Unified navigation utility for all app screen transitions
export const appNavigation = {
  routes: ROUTES,
  navigate: navigateTo,
  push: pushTo,
  replace: replaceWith,
  goBack,
  reset: resetTo,
  canGoBack,
  toSplash: () => replaceWith(ROUTES.SPLASH),
  toLogin: (replace = false) =>
    replace ? replaceWith(ROUTES.LOGIN) : pushTo(ROUTES.LOGIN),
  toSignUp: (replace = false) =>
    replace ? replaceWith(ROUTES.SIGNUP) : pushTo(ROUTES.SIGNUP),
  toForgotPassword: () => pushTo(ROUTES.FORGOT_PASSWORD),
  toHome: () => replaceWith(ROUTES.TABS),
  toTabs: () => replaceWith(ROUTES.TABS),
  toMap: () => navigateTo(ROUTES.MAP),
  toCharger: () => navigateTo(ROUTES.CHARGER),
  toWallet: () => navigateTo(ROUTES.WALLET),
  toProfile: () => navigateTo(ROUTES.PROFILE),
  toContactUs: () => pushTo(ROUTES.CONTACTUS),
  toOffers: () => pushTo(ROUTES.OFFERS),
  toEditProfile: () => pushTo(ROUTES.EDITPROFILE),
  toReferAndEarn: () => pushTo(ROUTES.REFERANDEARN),
  toAbout: () => pushTo(ROUTES.ABOUT),
  toFaq: () => pushTo(ROUTES.FAQ),
  toPrivacyPolicy: () => pushTo(ROUTES.PRIVACYPOLICY),
  toTermsAndConditions: () => pushTo(ROUTES.TERMSANDCONDITIONS),
} as const;

export default appNavigation;
