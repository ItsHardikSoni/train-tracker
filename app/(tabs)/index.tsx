import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';
import { fetchTrainRouteAPI } from '@/api/trainRouteService';

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const formatTime = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes() as any;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export default function HomeScreen() {
  const router = useRouter();
  const [recentPnr, setRecentPnr] = useState<any>(null);
  const [trainNo, setTrainNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecentPnr = async () => {
      try {
        const pnrData = await AsyncStorage.getItem("pnrData");
        if (pnrData) {
          const parsedPnrData = JSON.parse(pnrData);
          if (parsedPnrData.length > 0) {
            setRecentPnr(parsedPnrData[parsedPnrData.length - 1].data);
          }
        }
      } catch (e) {
        console.error("Failed to load PNR data.", e);
      }
    };
    getRecentPnr();
  }, []);

  const handleTrackTrain = async () => {
    Keyboard.dismiss();
    if (!trainNo) {
      setError("Please enter a train number.");
      return;
    }
    setLoading(true);
    setData(null);
    setError(null);

    const result = await fetchTrainRouteAPI(trainNo);

    if (result.success) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <ThemedView style={styles.header}>
          <IconSymbol name="line.horizontal.3" size={24} color={AppColors.background} />
          <ThemedText style={styles.title} type="title">Train Tracker</ThemedText>
          <IconSymbol name="magnifyingglass" size={24} color={AppColors.background} />
        </ThemedView>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search train number"
            placeholderTextColor={AppColors.textSecondary}
            value={trainNo}
            onChangeText={setTrainNo}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.trackButton} onPress={handleTrackTrain} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={AppColors.background} />
            ) : (
              <Text style={styles.trackButtonText}>Track</Text>
            )}
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {data && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Train Route</Text>
            <View style={styles.trainDetailCard}>
              <Text style={styles.trainDetailText}>Train No: {data.train_no}</Text>
              <Text style={styles.trainDetailText}>Train Name: {data.train_name}</Text>
            </View>
            {data.route.map((station: any, index: number) => (
              <View key={index} style={styles.stationCard}>
                <Text style={styles.stationName}>{station.station_name} ({station.station_code})</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Arrival:</Text>
                  <Text style={styles.detailValue}>{station.arrival_time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Departure:</Text>
                  <Text style={styles.detailValue}>{station.departure_time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Halt (mins):</Text>
                  <Text style={styles.detailValue}>{station.halt_minutes}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Distance (km):</Text>
                  <Text style={styles.detailValue}>{station.distance_from_source}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Day:</Text>
                  <Text style={styles.detailValue}>{station.day_of_journey}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

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

        {recentPnr &&
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardDate}>{formatDate(recentPnr.dateOfJourney)}</Text>
            <View style={styles.trainInfoRow}>
              <Text style={styles.trainName}>{recentPnr.trainName}</Text>
              <Text style={styles.confirmed}>{recentPnr.passengerList[0].currentStatus}</Text>
            </View>
            <View style={styles.routeContainer}>
              <Text style={styles.routeTime}>{formatTime(recentPnr.dateOfJourney)}</Text>
              <Text style={styles.routeLine}>---</Text>
              <Text style={styles.routeTime}>{formatTime(recentPnr.arrivalDate)}</Text>
            </View>
            <View style={styles.routeContainer}>
              <Text style={styles.routeStation}>{recentPnr.sourceStation}</Text>
              <Text style={styles.routeStation}>{recentPnr.destinationStation}</Text>
            </View>
            <View style={styles.coachInfo}>
              <Text style={{color: AppColors.textPrimary}}>Coach: {recentPnr.passengerList[0].currentCoachId} | Seat: {recentPnr.passengerList[0].currentBerthNo}</Text>
              <TouchableOpacity>
                <Text style={styles.details}>Details {'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        }

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
    minWidth: 80,
  },
  trackButtonText: {
    color: AppColors.background,
    fontWeight: 'bold',
    textAlign: 'center',
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
  errorText: {
    color: AppColors.error,
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  resultContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    marginBottom: 12,
  },
  trainDetailCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderColor: AppColors.border,
    borderWidth: 1,
  },
  trainDetailText: {
    fontSize: 16,
    color: AppColors.textPrimary,
    marginBottom: 4,
  },
  stationCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderColor: AppColors.border,
    borderWidth: 1,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    color: AppColors.textSecondary,
  },
  detailValue: {
    color: AppColors.textPrimary,
    fontWeight: '500',
  },
});