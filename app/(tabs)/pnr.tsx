import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';

export default function PnrScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <ThemedText style={styles.title} type="title">Check PNR Status</ThemedText>

        <View style={styles.pnrInputContainer}>
          <IconSymbol name="text.book.closed" size={24} color={AppColors.secondary} style={styles.inputIcon} />
          <TextInput
            style={styles.pnrInput}
            placeholder="Enter 10-digit PNR Number"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>

        <TouchableOpacity style={styles.checkStatusButton}>
          <Text style={styles.checkStatusButtonText}>Check Status</Text>
        </TouchableOpacity>

        <View style={styles.activeSearchContainer}>
          <Text style={styles.activeSearchTitle}>ACTIVE SEARCH RESULT</Text>
          <Text style={styles.activePnr}>PNR: 4829304122</Text>
          <View style={styles.trainCard}>
            <Text style={styles.trainNumber}>12952 - Mumbai Rajdhani</Text>
            <Text style={styles.trainDate}>Fri, 24 May 2024</Text>
            <View style={styles.routeContainer}>
              <Text style={styles.station}>NDLS</Text>
              <Text style={styles.duration}>15h 32m</Text>
              <Text style={styles.station}>MMCT</Text>
            </View>
             <View style={styles.routeContainer}>
              <Text style={styles.stationName}>New Delhi</Text>
              <Text style={styles.stationName}>Mumbai Central</Text>
            </View>
          </View>

          <View style={styles.passengerDetailsContainer}>
            <ThemedText type="subtitle">PASSENGER DETAILS</ThemedText>
            <View style={styles.passengerRow}>
              <Text>Passenger 1</Text>
              <Text>Booking: B1, 42</Text>
              <Text style={styles.confirmed}>CNF</Text>
            </View>
            <View style={styles.passengerRow}>
              <Text>Passenger 2</Text>
              <Text>Booking: B1, 45</Text>
              <Text style={styles.confirmed}>CNF</Text>
            </View>
             <Text style={styles.chartStatus}>Chart not prepared</Text>
          </View>
        </View>

        <View style={styles.recentSearchesContainer}>
          <View style={styles.recentSearchesHeader}>
            <ThemedText type="subtitle">Recent Searches</ThemedText>
            <TouchableOpacity>
              <Text style={styles.clearAll}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentSearchCard}>
            <IconSymbol name="arrow.counterclockwise" size={24} color={AppColors.secondary}/>
            <View style={styles.recentInfo}>
                <Text style={styles.recentPnr}>6394102941</Text>
                <Text style={styles.recentTrain}>Shatabdi Exp • 22 May</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={AppColors.secondary}/>
          </View>
          <View style={styles.recentSearchCard}>
            <IconSymbol name="arrow.counterclockwise" size={24} color={AppColors.secondary}/>
             <View style={styles.recentInfo}>
                <Text style={styles.recentPnr}>8210394857</Text>
                <Text style={styles.recentTrain}>Garib Rath • 18 May</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={AppColors.secondary}/>
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
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: AppColors.primary,
  },
  pnrInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.secondary,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  pnrInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: AppColors.primary,
  },
  checkStatusButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  checkStatusButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeSearchContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: AppColors.secondary,
  },
  activeSearchTitle: {
    fontWeight: 'bold',
    color: AppColors.secondary,
    marginBottom: 4,
  },
  activePnr: {
    color: AppColors.primary,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  trainCard: {
    marginBottom: 16,
  },
  trainNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: AppColors.primary,
  },
  trainDate: {
    color: AppColors.secondary,
    marginBottom: 8,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  station: {
    fontWeight: 'bold',
    fontSize: 16,
    color: AppColors.primary,
  },
   stationName: {
    color: AppColors.secondary,
    fontSize: 12,
  },
  duration: {
    color: AppColors.secondary,
  },
  passengerDetailsContainer: {
    borderTopWidth: 1,
    borderTopColor: AppColors.accent2,
    paddingTop: 16,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    color: AppColors.primary,
  },
  confirmed: {
    color: AppColors.accent1,
    fontWeight: 'bold',
  },
  chartStatus: {
    textAlign: 'center',
    color: AppColors.secondary,
    marginTop: 8,
  },
  recentSearchesContainer: {},
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearAll: {
    color: AppColors.primary,
    fontWeight: 'bold',
  },
  recentSearchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: AppColors.secondary,
  },
  recentInfo: {
      flex: 1,
      marginLeft: 12,
  },
  recentPnr:{
      fontWeight: 'bold',
      color: AppColors.primary,
  },
  recentTrain: {
      color: AppColors.secondary,
  }
});