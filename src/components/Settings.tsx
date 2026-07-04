import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* The rest of the pickers will go here later */}
      <View style={styles.content}>
        <Text style={styles.placeholderText}>Pickers coming soon...</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#5f6368",
    fontSize: 18,
  },
});
