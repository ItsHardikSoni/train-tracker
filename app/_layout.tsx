import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Prevent the native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [isSplashAnimationComplete, setSplashAnimationComplete] = useState(false);
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
      if (loaded && isSplashAnimationComplete) {
        SplashScreen.hideAsync();
      }
    }, [loaded, isSplashAnimationComplete]);

    const onAnimationFinish = useCallback(() => {
        setSplashAnimationComplete(true);
    }, []);

    if (!loaded) {
      return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {isSplashAnimationComplete ? (
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background}} edges={['top', 'left', 'right']}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="live" options={{ headerShown: false }} />
                        <Stack.Screen name="pnr" options={{ headerShown: false }} />
                    </Stack>
                    <StatusBar style="auto" />
                </SafeAreaView>
            ) : (
                <AnimatedSplashScreen onAnimationFinish={onAnimationFinish} />
            )}
        </ThemeProvider>
    );
}
