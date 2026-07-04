import { SplashScreen, Stack } from 'expo-router';
import React, { useCallback, useState, useEffect } from 'react';
import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { Colors } from '@/constants/theme';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

// Prevent the native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [isSplashAnimationComplete, setSplashAnimationComplete] = useState(false);
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);

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
