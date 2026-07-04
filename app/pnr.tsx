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

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return dateStr.split(" ").slice(0, 3).join(" ");
};

const formatTime = (dateStr: string) => {
  if (!dateStr) return "";
  const parts = dateStr.split(" ");
  if (parts.length < 5) return "";
  const time = parts[3];
  const ampm = parts[4];
  const timeParts = time.split(":");
  return `${timeParts[0]}:${timeParts[1]} ${ampm}`;
};

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          <ThemedText type="title">PNR Status</ThemedText>
          <ThemedText style={styles.subtitle}>
            Enter your 10-digit PNR number to get the latest status.
          </ThemedText>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-Digit PNR"
              placeholderTextColor={AppColors.textSecondary}
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
              <ActivityIndicator color={AppColors.background} />
            ) : (
              <Text style={styles.buttonText}>Check PNR Status</Text>
            )}
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          {data && (
            <View style={styles.resultContainer}>
              <View style={styles.card}>
                <ThemedText style={styles.cardTitle}>
                  {data.trainName} ({data.trainNumber})
                </ThemedText>
                <View style={styles.stationContainer}>
                  <View style={styles.station}>
                    <ThemedText style={styles.stationCode}>
                      {data.sourceStation}
                    </ThemedText>
                    <ThemedText style={styles.stationName} numberOfLines={1}>
                      {data.boardingStationName}
                    </ThemedText>
                  </View>
                  <IconSymbol
                    name="arrow-forward"
                    size={24}
                    color={AppColors.primary}
                    style={{ marginHorizontal: 10 }}
                  />
                  <View style={styles.station}>
                    <ThemedText style={styles.stationCode}>
                      {data.destinationStation}
                    </ThemedText>
                    <ThemedText style={styles.stationName} numberOfLines={1}>
                      {data.reservationUptoName}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.timeDetail}>
                    <ThemedText style={styles.detailLabel}>Departure</ThemedText>
                    <ThemedText style={styles.timeText}>
                      {formatTime(data.dateOfJourney)}
                    </ThemedText>
                    <ThemedText style={styles.dateText}>
                      {formatDate(data.dateOfJourney)}
                    </ThemedText>
                  </View>
                  <View style={styles.timeDetail}>
                    <ThemedText style={styles.detailLabel}>Arrival</ThemedText>
                    <ThemedText style={styles.timeText}>
                      {formatTime(data.arrivalDate)}
                    </ThemedText>
                    <ThemedText style={styles.dateText}>
                      {formatDate(data.arrivalDate)}
                    </ThemedText>
                  </View>
                  <View style={styles.timeDetail}>
                    <ThemedText style={styles.detailLabel}>Class</ThemedText>
                    <ThemedText
                      style={[styles.timeText, { textTransform: "uppercase" }]}
                    >
                      {data.journeyClass}
                    </ThemedText>
                  </View>
                </View>
              </View>

              <ThemedText
                type="subtitle"
                style={{
                  marginTop: 20,
                  marginBottom: 10,
                  alignSelf: "flex-start",
                }}
              >
                Passengers
              </ThemedText>

              {data.passengerList.map((passenger: any, index: number) => (
                <View style={styles.card} key={index}>
                  <View style={styles.passengerHeader}>
                    <ThemedText style={styles.passengerCount}>
                      Passenger {index + 1}
                    </ThemedText>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            passenger.currentStatus?.toLowerCase() === "cnf"
                              ? AppColors.success
                              : AppColors.warning,
                        },
                      ]}
                    >
                      <Text style={styles.statusBadgeText}>
                        {passenger.currentStatus}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.passengerDetails}>
                    <View style={styles.passengerDetailRow}>
                      <ThemedText style={styles.detailLabel}>
                        Booking Status:
                      </ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {passenger.bookingStatus} (
                        {passenger.bookingCoachId
                          ? `${passenger.bookingCoachId}, ${passenger.bookingBerthNo} ${passenger.bookingBerthCode}`
                          : "N/A"}
                        )
                      </ThemedText>
                    </View>
                    {passenger.currentStatus?.toLowerCase() === "cnf" && (
                      <View style={styles.passengerDetailRow}>
                        <ThemedText style={styles.detailLabel}>
                          Current Seat:
                        </ThemedText>
                        <ThemedText style={styles.detailValue}>
                          {passenger.currentCoach}, {passenger.currentBerthNo}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>
              ))}

              <View style={[styles.card, styles.chartStatus]}>
                <ThemedText style={styles.detailText}>
                  Charting Status:{" "}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.chartStatusText,
                    {
                      color:
                        data.chartStatus === "Chart Not Prepared"
                          ? AppColors.warning
                          : AppColors.success,
                    },
                  ]}
                >
                  {data.chartStatus}
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
    backgroundColor: AppColors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    textAlign: "center",
    fontSize: 16,
    color: AppColors.textSecondary,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: AppColors.surface,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: AppColors.border,
    color: AppColors.textPrimary,
  },
  button: {
    backgroundColor: AppColors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: AppColors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: AppColors.error,
    marginTop: 16,
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 24,
    width: "100%",
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: AppColors.primary,
  },
  stationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  station: {
    alignItems: "center",
    flex: 1,
  },
  stationCode: {
    fontSize: 22,
    fontWeight: "bold",
    color: AppColors.textPrimary,
  },
  stationName: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 2,
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  passengerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.textPrimary,
  },
  statusBadge: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusBadgeText: {
    color: AppColors.background,
    fontSize: 12,
    fontWeight: "bold",
  },
  chartStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chartStatusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  timeDetail: {
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.textPrimary,
  },
  dateText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  passengerDetails: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    paddingTop: 12,
  },
  passengerDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.textPrimary,
  },
});