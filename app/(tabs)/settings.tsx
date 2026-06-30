import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';

export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [liveActivities, setLiveActivities] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <ThemedText style={styles.title} type="title">Settings</ThemedText>

            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle} type="subtitle">General</ThemedText>
                <View style={styles.row}>
                    <IconSymbol name="bell" size={24} color="#888" style={styles.icon}/>
                    <Text style={styles.rowLabel}>Notifications</Text>
                    <Switch 
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                </View>
                <View style={styles.row}>
                    <IconSymbol name="figure.walk.motion" size={24} color="#888" style={styles.icon}/>
                    <Text style={styles.rowLabel}>Live Activities</Text>
                     <Switch 
                        value={liveActivities}
                        onValueChange={setLiveActivities}
                    />
                </View>
            </View>
            
            <View style={styles.section}>
                <ThemedText style={styles.sectionTitle} type="subtitle">About</ThemedText>
                 <TouchableOpacity style={styles.row}>
                    <IconSymbol name="info.circle" size={24} color="#888" style={styles.icon}/>
                    <Text style={styles.rowLabel}>Version</Text>
                    <Text style={styles.rowValue}>1.0.0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <IconSymbol name="doc.text" size={24} color="#888" style={styles.icon}/>
                    <Text style={styles.rowLabel}>Terms of Service</Text>
                    <IconSymbol name="chevron.right" size={20} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                    <IconSymbol name="shield" size={24} color="#888" style={styles.icon}/>
                    <Text style={styles.rowLabel}>Privacy Policy</Text>
                    <IconSymbol name="chevron.right" size={20} color="#ccc" />
                </TouchableOpacity>
            </View>

             <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Send Feedback</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Rate us on the App Store</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>Made with ❤️ in India</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        marginBottom: 24,
        textAlign: 'center',
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    icon: {
        marginRight: 16,
    },
    rowLabel: {
        flex: 1,
        fontSize: 16,
    },
    rowValue: {
        fontSize: 16,
        color: '#888',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        fontSize: 16,
        color: '#007bff',
        fontWeight: 'bold'
    },
    footer: {
        textAlign: 'center',
        color: '#888',
        marginTop: 24,
    }
});
