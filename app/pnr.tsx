import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPnrStatusAPI } from '@/api/pnrService';

export default function PnrScreen() {
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPnrStatus = async () => {
    if (pnr.length !== 10) {
      setError('Please enter a valid 10-digit PNR number.');
      return;
    }
    setLoading(true);
    setData(null);
    setError(null);

    const result = await fetchPnrStatusAPI(pnr);

    if (result.success) {
      setData(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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

          <TouchableOpacity style={styles.button} onPress={fetchPnrStatus} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Check PNR Status</Text>
            )}
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          {data && (
            <View style={styles.resultContainer}>

              <Text style={styles.resultTitle}>
                PNR Details
              </Text>

              <Text>
                PNR: {data.pnrNumber}
              </Text>

              <Text>
                Train: {data.trainName} ({data.trainNumber})
              </Text>

              <Text>
                From: {data.sourceStation}
              </Text>

              <Text>
                To: {data.destinationStation}
              </Text>

              <Text>
                Boarding: {data.boardingPoint}
              </Text>

              <Text>
                Journey Date:
                {" "}
                {data.dateOfJourney}
              </Text>

              <Text>
                Class:
                {" "}
                {data.journeyClass}
              </Text>

              <Text>
                Chart Status:
                {" "}
                {data.chartStatus}
              </Text>

              <Text style={styles.passengersTitle}>
                Passenger Details
              </Text>

              {data.passengerList?.map(
                (passenger: any, index: number) => (

                  <View key={index}>

                    <Text>

                      Passenger {index + 1}

                    </Text>

                    <Text>

                      Booking:

                      {" "}

                      {passenger.bookingStatusDetails}

                    </Text>

                    <Text>

                      Current:

                      {" "}

                      {passenger.currentStatusDetails}

                    </Text>

                    <Text>

                      Coach:

                      {" "}

                      {passenger.currentCoachId}

                    </Text>

                    <Text>

                      Berth:

                      {" "}

                      {passenger.currentBerthNo}

                    </Text>

                  </View>

                )
              )}

            </View>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  errorText: {
    color: 'red',
    marginTop: 16,
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '100%',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  passengersTitle: {
    fontWeight: 'bold',
    marginTop: 8,
  },
});
