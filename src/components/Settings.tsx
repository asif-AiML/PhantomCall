import MaterialIcons from "@react-native-vector-icons/material-icons";
import * as DocumentPicker from "expo-document-picker"; // The Native File Explorer
import { Pressable, StyleSheet, Text, View } from "react-native";

// Update the nervous system to accept the new state from index.tsx
interface SettingsProps {
  onClose: () => void;
  currentRingtoneName: string;
  onSelectRingtone: (uri: string, name: string) => void;
}

export default function Settings({
  onClose,
  currentRingtoneName,
  onSelectRingtone,
}: SettingsProps) {
  // The function that triggers the Android OS File Explorer
  const pickRingtone = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*", // Strictly only allow audio files to be selected
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        onSelectRingtone(file.uri, file.name); // Send the file data back to index.tsx
      }
    } catch (error) {
      console.error("Error picking audio:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>PhantomCall Settings</Text>
      </View>

      <View style={styles.content}>
        {/* RINGTONE PICKER ROW */}
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingLabel}>Custom Ringtone</Text>
            <Text style={styles.settingValue} numberOfLines={1}>
              {currentRingtoneName}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={pickRingtone}
          >
            <Text style={styles.actionButtonText}>Select</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#1e1e1e",
    elevation: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  // --- New Settings Row Styles ---
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "500",
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 14,
    color: "#9aa0a6",
  },
  actionButton: {
    backgroundColor: "#20a359",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
});
