import { SplashScreen } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AppColors } from '@/constants/colors';

export function AnimatedSplashScreen({ onAnimationFinish }: { onAnimationFinish: () => void }) {
    const translateX = useRef(new Animated.Value(Dimensions.get('window').width)).current;

    useEffect(() => {
        SplashScreen.hideAsync(); // Hide native splash to show this JS splash

        Animated.timing(translateX, {
            toValue: -100,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            onAnimationFinish(); // Tell parent we are done
        });
    }, []);

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>Train Tracker</ThemedText>
            <View style={styles.track} />
            <Animated.View style={[styles.train, { transform: [{ translateX }] }]}>
                <Text style={styles.trainIcon}>🚂</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: AppColors.primary,
        marginBottom: 80,
    },
    track: {
        width: '80%',
        height: 4,
        backgroundColor: AppColors.border,
        borderRadius: 2,
    },
    train: {
        position: 'absolute',
        top: '50%',
        marginTop: -25,
    },
    trainIcon: {
        fontSize: 50,
        transform: [{ scaleX: -1 }],
    },
});
