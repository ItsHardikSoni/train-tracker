import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function LiveScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <ThemedText style={styles.title} type="title">Live Train Status</ThemedText>

        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={24} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Train Name or Number"
          />
        </View>

        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track Train</Text>
        </TouchableOpacity>

        <View style={styles.liveStatusContainer}>
          <Text style={styles.liveStatusTitle}>LIVE STATUS</Text>
          <View style={styles.trainCard}>
             <View style={styles.trainInfoRow}>
                <Text style={styles.trainName}>12002 - Shatabdi Exp</Text>
                <Text style={styles.liveIndicator}>● LIVE</Text>
            </View>
            <Text style={styles.updateTime}>Last updated: 2 mins ago</Text>
            <View style={styles.statusRow}>
                <Text>➡️ On Time</Text>
            </View>
            <View style={styles.stationInfo}>
                <Text style={styles.stationText}>GWL - Gwalior</Text>
                <Text style={styles.platform}>Platform 2</Text>
            </View>
            <Text style={styles.nextStation}>Next Stop: Morena in 28 mins</Text>
          </View>
        </View>

        <View style={styles.recentSearchesContainer}>
          <ThemedText type="subtitle">Recent Searches</ThemedText>
           <View style={styles.recentSearchCard}>
            <IconSymbol name="arrow.counterclockwise" size={24} color="#888"/>
            <View style={styles.recentInfo}>
                <Text style={styles.recentTrain}>12951</Text>
                <Text style={styles.recentDetail}>Yesterday</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#888"/>
          </View>
          <View style={styles.recentSearchCard}>
            <IconSymbol name="arrow.counterclockwise" size={24} color="#888"/>
             <View style={styles.recentInfo}>
                <Text style={styles.recentTrain}>22435</Text>
                <Text style={styles.recentDetail}>2 days ago</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#888"/>
          </View>
        </View>
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  trackButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  trackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  liveStatusContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  liveStatusTitle: {
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 12,
  },
  trainCard: {},
  trainInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  trainName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  liveIndicator: {
      color: 'red',
      fontWeight: 'bold',
  },
  updateTime: {
      color: '#888',
      fontSize: 12,
      marginBottom: 12,
  },
  statusRow: {
      backgroundColor: '#e7f7e7',
      padding: 8,
      borderRadius: 4,
      marginBottom: 12,
  },
  stationInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
  },
  stationText: {
      fontWeight: 'bold',
  },
  platform: {
      color: '#555',
  },
  nextStation: {
      color: '#007bff',
  },
  recentSearchesContainer: {},
  recentSearchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
   recentInfo: {
      flex: 1,
      marginLeft: 12,
  },
  recentTrain:{
      fontWeight: 'bold',
  },
  recentDetail: {
      color: '#888',
  }
});