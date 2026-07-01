import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';

export default function PnrScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.title} type="title">Check PNR Status</ThemedText>

        <View style={styles.pnrInputContainer}>
          <IconSymbol name="text.book.closed" size={24} color={AppColors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={styles.pnrInput}
            placeholder="Enter 10-digit PNR Number"
            placeholderTextColor={AppColors.textSecondary}
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
              <Text style={{color: AppColors.textPrimary}}>Passenger 1</Text>
              <Text style={{color: AppColors.textPrimary}}>Booking: B1, 42</Text>
              <Text style={styles.confirmed}>CNF</Text>
            </View>
            <View style={styles.passengerRow}>
              <Text style={{color: AppColors.textPrimary}}>Passenger 2</Text>
              <Text style={{color: AppColors.textPrimary}}>Booking: B1, 45</Text>
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
            <IconSymbol name="arrow.counterclockwise" size={24} color={AppColors.textSecondary}/>
            <View style={styles.recentInfo}>
                <Text style={styles.recentPnr}>6394102941</Text>
                <Text style={styles.recentTrain}>Shatabdi Exp • 22 May</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={AppColors.textSecondary}/>
          </View>
          <View style={styles.recentSearchCard}>
            <IconSymbol name="arrow.counterclockwise" size={24} color={AppColors.textSecondary}/>
             <View style={styles.recentInfo}>
                <Text style={styles.recentPnr}>8210394857</Text>
                <Text style={styles.recentTrain}>Garib Rath • 18 May</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={AppColors.textSecondary}/>
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
    color: AppColors.textPrimary,
  },
  pnrInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
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
    color: AppColors.textPrimary,
  },
  checkStatusButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  checkStatusButtonText: {
    color: AppColors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeSearchContainer: {
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  activeSearchTitle: {
    fontWeight: 'bold',
    color: AppColors.textSecondary,
    marginBottom: 4,
  },
  activePnr: {
    color: AppColors.textPrimary,
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
    color: AppColors.textPrimary,
  },
  trainDate: {
    color: AppColors.textSecondary,
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
    color: AppColors.textPrimary,
  },
   stationName: {
    color: AppColors.textSecondary,
    fontSize: 12,
  },
  duration: {
    color: AppColors.textSecondary,
  },
  passengerDetailsContainer: {
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    paddingTop: 16,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  confirmed: {
    color: AppColors.background,
    fontWeight: 'bold',
    backgroundColor: AppColors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  chartStatus: {
    textAlign: 'center',
    color: AppColors.textSecondary,
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
    color: AppColors.accent,
    fontWeight: 'bold',
  },
  recentSearchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  recentInfo: {
      flex: 1,
      marginLeft: 12,
  },
  recentPnr:{
      fontWeight: 'bold',
      color: AppColors.textPrimary,
  },
  recentTrain: {
      color: AppColors.textSecondary,
  }
});