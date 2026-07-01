import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { Colors } from '@/constants/theme';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Prevent the native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
    const colorScheme = useColorScheme();

    useEffect(() => {
        // Hide the native splash screen.
        SplashScreen.hideAsync();

        // Wait for 3 seconds before marking the splash animation as finished.
        const timer = setTimeout(() => {
            setSplashAnimationFinished(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!splashAnimationFinished) {
        return <AnimatedSplashScreen />;
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background}} edges={['top', 'left', 'right']}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaView>
    );
}
