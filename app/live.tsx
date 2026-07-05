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
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchLiveTrainStatusAPI } from "@/api/liveTrainService";
import { AppColors } from "@/constants/colors";

export default function LiveTrainStatusScreen() {
  const [trainNo, setTrainNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveTrainStatus = async () => {
    Keyboard.dismiss();
    if (!trainNo) {
      setError("Please enter a train number.");
      return;
    }
    setLoading(true);
    setData(null);
    setError(null);

    const result = await fetchLiveTrainStatusAPI(trainNo);

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
          <ThemedText type="title">Live Train Status</ThemedText>
          <ThemedText style={styles.subtitle}>
            Enter the train number to get the live status.
          </ThemedText>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Train Number"
              placeholderTextColor={AppColors.textSecondary}
              value={trainNo}
              onChangeText={setTrainNo}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={fetchLiveTrainStatus}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={AppColors.background} />
            ) : (
              <Text style={styles.buttonText}>Get Live Status</Text>
            )}
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          {data && (
            <View style={styles.resultContainer}>
              <View style={styles.card}>
                <ThemedText style={styles.cardTitle}>
                  Train No: {data.train_no}
                </ThemedText>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>
                      Running Status:
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {data.running_status === 0 ? "On time" : "Delayed"}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>Station:</ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {data.station}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>Date:</ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {data.day_date}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>
                      Arrives:
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {data.arrives}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>
                      Departs:
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {data.departs}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>Delay:</ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {data.delay}
                    </ThemedText>
                  </View>
                </View>
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
  detailsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.textPrimary,
  },
});
