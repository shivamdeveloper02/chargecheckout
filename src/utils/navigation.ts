import { router, type Href } from 'expo-router';

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
  OFFERS: '/offers'
} as const;

export type AppRouteKey = keyof typeof ROUTES;
export type AppRoutePath = (typeof ROUTES)[AppRouteKey];
export type NavigationParams = Record<string, string | number | undefined>;

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
  toOffers: () => pushTo(ROUTES.OFFERS)
} as const;

export default appNavigation;
