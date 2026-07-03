import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.header}>
          <IconSymbol name="line.horizontal.3" size={24} color={AppColors.background} />
          <ThemedText style={styles.title} type="title">Train Tracker</ThemedText>
          <IconSymbol name="magnifyingglass" size={24} color={AppColors.background} />
        </ThemedView>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search train name or number"
            placeholderTextColor={AppColors.textSecondary}
          />
          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/pnr')}>
            <IconSymbol name="text.book.closed" size={24} color={AppColors.accent} />
            <Text style={styles.cardText}>PNR Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => router.push('/live')}>
            <IconSymbol name="dot.radiowaves.up.forward" size={24} color={AppColors.accent} />
            <Text style={styles.cardText}>Live Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <IconSymbol name="map" size={24} color={AppColors.accent} />
            <Text style={styles.cardText}>Train Route</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <IconSymbol name="magnifyingglass" size={24} color={AppColors.accent} />
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
              <Text style={{color: AppColors.textPrimary}}>Coach: C12 | Seat: 44</Text>
              <TouchableOpacity>
                <Text style={styles.details}>Details {'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.recentSearchesContainer}>
        <ThemedText type="subtitle">Recent Searches</ThemedText>
        <View style={styles.recentSearchCard}>
          <Text style={{color: AppColors.textPrimary}}>NDLS - HW</Text>
          <Text style={{color: AppColors.textSecondary}}>2 hours ago</Text>
        </View>
        <View style={styles.recentSearchCard}>
          <Text style={{color: AppColors.textPrimary}}>12951</Text>
          <Text style={{color: AppColors.textSecondary}}>Yesterday</Text>
        </View>
        <View style={styles.recentSearchCard}>
          <Text style={{color: AppColors.textPrimary}}>BPL</Text>
          <Text style={{color: AppColors.textSecondary}}>2 days ago</Text>
        </View>
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppColors.primary,
  },
  title: {
    color: AppColors.background,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: AppColors.background,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: AppColors.surface,
    color: AppColors.textPrimary,
  },
  trackButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  trackButtonText: {
    color: AppColors.background,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderColor: AppColors.border,
    borderWidth: 1,
  },
  cardText: {
    marginTop: 8,
    color: AppColors.textPrimary,
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  infoCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 16,
    borderColor: AppColors.border,
    borderWidth: 1,
  },
  infoCardDate: {
    fontWeight: 'bold',
    color: AppColors.textSecondary,
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
    color: AppColors.textPrimary,
  },
  confirmed: {
    color: AppColors.background,
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: AppColors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
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
    color: AppColors.textPrimary,
  },
  routeLine: {
    color: AppColors.border,
  },
  routeStation: {
    color: AppColors.textSecondary,
  },
  coachInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  details: {
    color: AppColors.accent,
    fontWeight: 'bold',
  },
  recentSearchesContainer: {
    padding: 16,
  },
  recentSearchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderColor: AppColors.border,
    borderWidth: 1,
  },
});