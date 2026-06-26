import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

// 1. Define the "Nervous System" - what commands can this screen accept?
interface CallScreenProps {
  onEndCall: () => void;
  onAnswerCall?: () => void; // The '?' makes it optional for now while we build
}

// 2. Inject the props into the component function
export default function CallScreen({
  onEndCall,
  onAnswerCall,
}: CallScreenProps) {
  return (
    <View style={styles.container}>
      {/* TOP SECTION: Caller ID & Image */}
      <View style={styles.callerIdSection}>
        <Text style={styles.networkText}>Call via Zong from</Text>
        <View style={styles.imageFrame}>
          <MaterialIcons name="person" size={60} color="#9aa0a6" />
        </View>
        <Text style={styles.callerName}>Bro Azam - Family</Text>
        <Text style={styles.mobileNumber}>Mobile 0314 4898000</Text>
      </View>

      {/* MIDDLE SECTION: Message Pill */}
      <View style={styles.messageSection}>
        <Pressable style={styles.messagePill}>
          <MaterialIcons name="message" size={20} color="#005b60" />
          <Text style={styles.messageText}>Message</Text>
        </Pressable>
      </View>

      {/* BOTTOM SECTION: The Two-Button Action Layout */}
      {/* BOTTOM SECTION: The Two-Button Action Layout */}
      <View style={styles.actionButtonsContainer}>
        {/* Decline Button */}
        <View style={styles.buttonWrapper}>
          <Pressable
            // 1. Convert style to an arrow function that reads the 'pressed' state
            style={({ pressed }) => [
              styles.circleButton,
              styles.declineButton,
              pressed && styles.buttonPressed, // 2. Apply this only when finger is down
            ]}
            onPress={onEndCall}
          >
            <MaterialIcons name="call-end" size={36} color="#ffffff" />
          </Pressable>
          <Text style={styles.buttonLabel}>Decline</Text>
        </View>

        {/* Answer Button */}
        <View style={styles.buttonWrapper}>
          <Pressable
            style={({ pressed }) => [
              styles.circleButton,
              styles.answerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onAnswerCall}
          >
            <MaterialIcons name="call" size={36} color="#ffffff" />
          </Pressable>
          <Text style={styles.buttonLabel}>Answer</Text>
        </View>
      </View>
    </View>
  );
}

// ... Keep your existing StyleSheet.create(...) exactly the same below this line

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F1F8", // The light blue native tint from the screenshot
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 60,
  },

  // --- Top Section Styles ---
  callerIdSection: {
    alignItems: "center",
    marginTop: 20,
  },
  networkText: {
    fontSize: 18,
    color: "#5f6368",
    marginBottom: 20,
  },
  imageFrame: {
    width: 140,
    height: 140,
    borderRadius: 70, // Exactly half of 140 to create a perfect circle
    backgroundColor: "#d8e2e8", // Slightly darker than background to show the frame
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  callerName: {
    fontSize: 38,
    color: "#1d2a35",
    fontWeight: "400",
    marginBottom: 10,
    textAlign: "center",
  },
  mobileNumber: {
    fontSize: 20,
    color: "#464d53",
  },

  // --- Middle Section Styles ---
  messageSection: {
    alignItems: "center",
  },
  messagePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 2, // Native Android drop shadow
  },
  messageText: {
    fontSize: 18,
    color: "#001d20",
    marginLeft: 8,
    fontWeight: "500",
  },

  // --- Bottom Section Styles ---
  actionButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly", // Spreads the two buttons perfectly
    alignItems: "center",
    marginBottom: 40,
  },
  buttonWrapper: {
    alignItems: "center",
  },
  circleButton: {
    width: 80,
    height: 80,
    borderRadius: 40, // Perfect circle
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Stronger drop shadow for primary buttons
  },
  declineButton: {
    backgroundColor: "#d93025", // Deep native red
  },
  answerButton: {
    backgroundColor: "#20a359", // Vibrant native green
  },
  buttonLabel: {
    marginTop: 12,
    fontSize: 18,
    color: "#1d2a35",
    fontWeight: "500",
  },
  buttonPressed: {
    transform: [{ scale: 0.92 }], // Shrinks the button by 8% to feel pushed in
    opacity: 0.85, // Dims the color slightly
    elevation: 1, // Flattens the drop shadow
  },
});
