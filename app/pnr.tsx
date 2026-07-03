import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

export default function PnrScreen() {
  const [pnr, setPnr] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">PNR Status</ThemedText>
        <ThemedText style={styles.subtitle}>Enter your 10-digit PNR number to get the latest status.</ThemedText>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter PNR"
            placeholderTextColor="#999"
            value={pnr}
            onChangeText={setPnr}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Check PNR Status</Text>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#ff9900',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
