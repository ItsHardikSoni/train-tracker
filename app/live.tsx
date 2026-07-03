import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

export default function LiveScreen() {
  const [trainNumber, setTrainNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Live Train Status</ThemedText>
        <ThemedText style={styles.subtitle}>Enter the train number to get its live running status.</ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Train Number"
            placeholderTextColor="#999"
            value={trainNumber}
            onChangeText={setTrainNumber}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Track Train</Text>
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
    backgroundColor: '#007bff',
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
