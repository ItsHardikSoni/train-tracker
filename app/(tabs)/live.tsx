import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors } from '@/constants/colors';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LiveScreen() {
  return (
      <ScrollView style={styles.container}>
        <ThemedText style={styles.title} type="title">Live Train Status</ThemedText>

        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={24} color={AppColors.secondary} style={styles.inputIcon} />
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
                <Text style={{color: AppColors.primary}}>➡️ On Time</Text>
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
            <IconSymbol name="arrow.counterclockwise" size={24} color={AppColors.secondary}/>
            <View style={styles.recentInfo}>
                <Text style={styles.recentTrain}>12951</Text>
                <Text style={styles.recentDetail}>Yesterday</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={AppColors.secondary}/>
          </View>
          <View style={styles.recentSearchCard}>
            <IconSymbol name="arrow.counterclockwise" size={24} color={AppColors.secondary}/>
             <View style={styles.recentInfo}>
                <Text style={styles.recentTrain}>22435</Text>
                <Text style={styles.recentDetail}>2 days ago</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={AppColors.secondary}/>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
        backgroundColor: AppColors.background,

  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: AppColors.primary,
  },
  searchContainer: {
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
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: AppColors.primary,
  },
  trackButton: {
    backgroundColor: AppColors.primary,
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
    borderWidth: 1,
    borderColor: AppColors.secondary,
  },
  liveStatusTitle: {
    fontWeight: 'bold',
    color: AppColors.secondary,
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
    color: AppColors.primary,
  },
  liveIndicator: {
      color: AppColors.accent1,
      fontWeight: 'bold',
  },
  updateTime: {
      color: AppColors.secondary,
      fontSize: 12,
      marginBottom: 12,
  },
  statusRow: {
      backgroundColor: AppColors.accent2,
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
      color: AppColors.primary,
  },
  platform: {
      color: AppColors.secondary,
  },
  nextStation: {
      color: AppColors.primary,
  },
  recentSearchesContainer: {},
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
  recentTrain:{
      fontWeight: 'bold',
      color: AppColors.primary,
  },
  recentDetail: {
      color: AppColors.secondary,
  }
});