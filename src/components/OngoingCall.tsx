import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

// 1. The Nervous System
interface OngoingCallProps {
  onEndCall: () => void;
}

export default function OngoingCall({ onEndCall }: OngoingCallProps) {
  return (
    <View style={styles.container}>
      {/* TOP SECTION: Timer & Info */}
      <View style={styles.topSection}>
        <Text style={styles.timerText}>00:01</Text>
        <Text style={styles.callerName}>Bro Azam - Family</Text>
        <Text style={styles.networkText}>Zong</Text>
      </View>

      {/* MIDDLE SECTION: Large Avatar */}
      <View style={styles.imageFrame}>
        <MaterialIcons name="person" size={60} color="#9aa0a6" />
      </View>

      {/* BOTTOM SECTION: Control Panel */}
      <View style={styles.bottomSection}>
        {/* Row 1: The Tools (High-Fidelity Dummy Buttons) */}
        <View style={styles.toolsRow}>
          <View style={styles.toolWrapper}>
            <Pressable
              style={({ pressed }) => [
                styles.toolButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <MaterialIcons name="dialpad" size={28} color="#1d2a35" />
            </Pressable>
            <Text style={styles.toolLabel}>Keypad</Text>
          </View>

          <View style={styles.toolWrapper}>
            <Pressable
              style={({ pressed }) => [
                styles.toolButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <MaterialIcons name="mic" size={28} color="#1d2a35" />
            </Pressable>
            <Text style={styles.toolLabel}>Mute</Text>
          </View>

          <View style={styles.toolWrapper}>
            <Pressable
              style={({ pressed }) => [
                styles.toolButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <MaterialIcons name="volume-up" size={28} color="#1d2a35" />
            </Pressable>
            <Text style={styles.toolLabel}>Speaker</Text>
          </View>

          <View style={styles.toolWrapper}>
            <Pressable
              style={({ pressed }) => [
                styles.toolButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <MaterialIcons name="more-vert" size={28} color="#1d2a35" />
            </Pressable>
            <Text style={styles.toolLabel}>More</Text>
          </View>
        </View>

        {/* Row 2: The Kill Switch */}
        <View style={styles.killSwitchRow}>
          <Pressable
            style={({ pressed }) => [
              styles.endCallButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onEndCall}
          >
            <MaterialIcons name="call-end" size={40} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F1F8",
    justifyContent: "space-between", // Spreads Top, Middle, and Bottom evenly
    paddingVertical: 60,
  },

  // --- Top Section ---
  topSection: {
    alignItems: "center",
    marginTop: 40,
  },
  timerText: {
    fontSize: 22,
    color: "#464d53",
    marginBottom: 10,
  },
  callerName: {
    fontSize: 42,
    color: "#1d2a35",
    fontWeight: "500",
    marginBottom: 5,
    textAlign: "center",
    paddingHorizontal: 20, // Ensures the name doesn't touch the edges on smaller screens
  },
  networkText: {
    fontSize: 20,
    color: "#5f6368",
  },

  // --- Middle Section ---
  imageFrame: {
    width: 150,
    height: 150,
    borderRadius: 75, // Exactly half of 150 to create a perfect circle
    backgroundColor: "#d8e2e8", // Slightly darker than background to show the frame
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: "30%", // Centers the avatar horizontally
  },

  // --- Bottom Section ---
  bottomSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  toolsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  toolWrapper: {
    alignItems: "center",
  },
  toolButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  toolLabel: {
    marginTop: 10,
    fontSize: 16,
    color: "#464d53",
  },
  killSwitchRow: {
    alignItems: "center",
  },
  endCallButton: {
    width: 160, // Making it a wide pill shape like the screenshot
    height: 76,
    borderRadius: 38, // Exactly half height for perfect pill ends
    backgroundColor: "#d93025",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  // The interactive state that triggers when a finger presses down
  buttonPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.85,
    elevation: 1,
  },
});
