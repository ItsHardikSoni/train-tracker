import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';

// Prevent the native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

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

    return <Slot />;
}
