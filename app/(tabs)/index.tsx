import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Train Tracker</ThemedText>
        <IconSymbol name="magnifyingglass" size={24} />
      </ThemedView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search train name or number"
        />
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.card}>
          <IconSymbol name="text.book.closed" size={24} />
          <Text>PNR Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <IconSymbol name="dot.radiowaves.up.forward" size={24} />
          <Text>Live Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <IconSymbol name="map" size={24} />
          <Text>Train Route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <IconSymbol name="magnifyingglass" size={24} />
          <Text>Station Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>TOMORROW, 14 OCT</Text>
          <View style={styles.trainInfo}>
            <Text style={styles.trainName}>12002 - Shatabdi Exp</Text>
            <Text style={styles.confirmed}>CONFIRMED</Text>
          </View>
          <View style={styles.routeInfo}>
            <Text>06:00</Text>
            <Text>------</Text>
            <Text>11:50</Text>
          </View>
          <View style={styles.routeInfo}>
            <Text>NDLS</Text>
            <Text>BPL</Text>
          </View>
          <View style={styles.coachInfo}>
            <Text>Coach: C12 | Seat: 44</Text>
            <TouchableOpacity>
              <Text style={styles.details}>Details {'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.recentSearchesContainer}>
        <ThemedText type="subtitle">Recent Searches</ThemedText>
        <View style={styles.recentSearchCard}>
          <Text>NDLS - HW</Text>
          <Text>2 hours ago</Text>
        </View>
        <View style={styles.recentSearchCard}>
          <Text>12951</Text>
          <Text>Yesterday</Text>
        </View>
        <View style={styles.recentSearchCard}>
          <Text>BPL</Text>
          <Text>2 days ago</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  trackButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  trackButtonText: {
    color: 'white',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    width: '40%',
  },
  infoContainer: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  infoCardTitle: {
    fontWeight: 'bold',
  },
  trainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  trainName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmed: {
    color: 'green',
    fontWeight: 'bold',
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coachInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  details: {
    color: '#007bff',
  },
  recentSearchesContainer: {
    padding: 16,
  },
  recentSearchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
});
