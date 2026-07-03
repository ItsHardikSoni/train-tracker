import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPnrStatusAPI } from "@/api/pnrService";
import { IconSymbol } from "@/components/icon-symbol";
import { AppColors } from "@/constants/colors";

export default function PnrScreen() {
  const [pnr, setPnr] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPnrStatus = async () => {
    if (pnr.length !== 10) {
      setError("Please enter a valid 10-digit PNR number.");
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
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.content}>
          <ThemedText type="title">PNR Status</ThemedText>
          <ThemedText style={styles.subtitle}>
            Enter your 10-digit PNR number to get the latest status.
          </ThemedText>

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

          <TouchableOpacity
            style={styles.button}
            onPress={fetchPnrStatus}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Check PNR Status</Text>
            )}
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          {data && (
            <View style={styles.resultContainer}>
              <View style={styles.card}>
                <ThemedText style={styles.cardTitle}>
                  {data.TrainName} ({data.TrainNo})
                </ThemedText>
                <View style={styles.stationContainer}>
                  <View style={styles.station}>
                    <ThemedText style={styles.stationCode}>
                      {data.From}
                    </ThemedText>
                    <ThemedText style={styles.stationName}>
                      {data.BoardingStationName}
                    </ThemedText>
                  </View>
                  <IconSymbol
                    name="arrow-forward"
                    size={24}
                    color={AppColors.accent}
                    style={{ marginHorizontal: 10 }}
                  />
                  <View style={styles.station}>
                    <ThemedText style={styles.stationCode}>
                      {data.To}
                    </ThemedText>
                    <ThemedText style={styles.stationName}>
                      {data.ReservationUptoName}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.detailsContainer}>
                  <ThemedText style={styles.detailText}>
                    Journey Date: {data.JDate}
                  </ThemedText>
                  <ThemedText style={styles.detailText}>
                    Class: {data.Class}
                  </ThemedText>
                </View>
              </View>

              <ThemedText type="subtitle" style={{ marginTop: 20,
                marginBottom: 10,
                alignSelf: 'flex-start'
              }}>
                Passengers
              </ThemedText>

              {data.PassengerStatus.map((passenger: any, index: number) => (
                <View style={styles.card} key={index}>
                  <View style={styles.passengerHeader}>
                    <ThemedText style={styles.passengerCount}>
                      Passenger {index + 1}
                    </ThemedText>
                    <View style={styles.statusBadge}>
                      <ThemedText style={styles.statusBadgeText}>
                        {passenger.CurrentStatus}
                      </ThemedText>
                    </View>
                  </View>
                  <ThemedText style={styles.detailText}>
                    Booking Status: {passenger.BookingStatus}
                  </ThemedText>
                  <ThemedText style={styles.detailText}>
                    Seat: {passenger.CurrentCoach}, {passenger.CurrentBerthNo}
                  </ThemedText>
                </View>
              ))}

              <View style={[styles.card, styles.chartStatus]}>
                <ThemedText style={styles.detailText}>
                  Charting Status:{" "}
                </ThemedText>
                <ThemedText style={styles.chartStatusText}>
                  {data.ChatPrepared ? "Chart Prepared" : "Chart Not Prepared"}
                </ThemedText>
              </View>
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
    alignItems: "center",
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 18,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: AppColors.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
  resultContainer: {
    marginTop: 24,
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: AppColors.accent,
  },
  stationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  station: {
    alignItems: "center",
  },
  stationCode: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stationName: {
    fontSize: 12,
    color: "#666",
  },
  detailsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  passengerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBadge: {
    backgroundColor: AppColors.accent,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: 'bold'
  },
  chartStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  chartStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColors.accent
  }
});