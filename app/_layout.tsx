import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Prevent the native splash screen from auto-hiding
SplashScreen.hideAsync();

export default function RootLayout() {
  const [isSplashAnimationComplete, setSplashAnimationComplete] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Keep native splash screen visible until we're ready to show our JS splash
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      // Hide native splash screen as soon as we're ready to show our JS splash
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  const onAnimationFinish = useCallback(() => {
    setSplashAnimationComplete(true);
  }, []);

  if (!isAppReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isSplashAnimationComplete ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }} edges={['top', 'left', 'right']}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="pnr" />
            <Stack.Screen name="live" />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaView>
      ) : (
        <AnimatedSplashScreen onAnimationFinish={onAnimationFinish} />
      )}
    </ThemeProvider>
  );
}