import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <ThemedView style={styles.header}>
          <IconSymbol name="line.horizontal.3" size={24} color={AppColors.background} />
          <ThemedText type="title">Train Tracker</ThemedText>
          <IconSymbol name="magnifyingglass" size={24} color={AppColors.background} />
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
            <IconSymbol name="text.book.closed" size={24} color={AppColors.primary} />
            <Text style={styles.cardText}>PNR Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <IconSymbol name="dot.radiowaves.up.forward" size={24} color={AppColors.primary} />
            <Text style={styles.cardText}>Live Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <IconSymbol name="map" size={24} color={AppColors.primary} />
            <Text style={styles.cardText}>Train Route</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <IconSymbol name="magnifyingglass" size={24} color={AppColors.primary} />
            <Text style={styles.cardText}>Station Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardDate}>TOMORROW, 14 OCT</Text>
            <View style={styles.trainInfoRow}>
              <Text style={styles.trainName}>12002 - Shatabdi Exp</Text>
              <Text style={styles.confirmed}>CONFIRMED</Text>
            </View>
            <View style={styles.routeContainer}>
              <Text style={styles.routeTime}>06:00</Text>
              <Text style={styles.routeLine}>---</Text>
              <Text style={styles.routeTime}>11:50</Text>
            </View>
            <View style={styles.routeContainer}>
              <Text style={styles.routeStation}>NDLS</Text>
              <Text style={styles.routeStation}>BPL</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppColors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: AppColors.background,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.accent2,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: 'white'
  },
  trackButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  trackButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderColor: AppColors.secondary,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardText: {
    marginTop: 8,
    color: AppColors.primary,
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderColor: AppColors.secondary,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoCardDate: {
    fontWeight: 'bold',
    color: AppColors.secondary,
    marginBottom: 8,
  },
  trainInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  trainName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: AppColors.primary,
  },
  confirmed: {
    color: AppColors.primary,
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: AppColors.accent1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeTime: {
    fontWeight: 'bold',
    fontSize: 16,
    color: AppColors.primary,
  },
  routeLine: {
    color: AppColors.accent2,
  },
  routeStation: {
    color: AppColors.secondary,
  },
  coachInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: AppColors.accent2,
  },
  details: {
    color: AppColors.primary,
    fontWeight: 'bold',
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
    borderColor: AppColors.secondary,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
