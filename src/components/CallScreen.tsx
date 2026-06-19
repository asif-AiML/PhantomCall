import { Pressable, StyleSheet, Text, View } from "react-native";

interface CallScreenProps {
  onEndCall: () => void;
}

export function CallScreen({ onEndCall }: CallScreenProps) {
  return (
    <View style={styles.container}>
      {/* TOP: Caller ID Section */}
      <View style={styles.topSection}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitial}>B</Text>
        </View>
        <Text style={styles.callerName}>Bro Azam - Family</Text>
        <Text style={styles.callStatus}>Incoming call...</Text>
      </View>

      {/* BOTTOM: Action Buttons */}
      <View style={styles.buttonSection}>
        {/* Red Decline Button */}
        <Pressable
          style={[styles.callButton, styles.declineButton]}
          onPress={onEndCall}
        >
          <Text style={styles.buttonText}>DECLINE</Text>
        </Pressable>

        {/* Green Accept Button */}
        <Pressable
          style={[styles.callButton, styles.acceptButton]}
          onPress={onEndCall}
        >
          <Text style={styles.buttonText}>ANSWER</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Pushes top info up and buttons down
    alignItems: "center",
    paddingVertical: 60,
    width: "100%",
  },
  topSection: {
    alignItems: "center",
  },
  profileCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInitial: {
    color: "#FFF",
    fontSize: 48,
  },
  callerName: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  callStatus: {
    color: "#888",
    fontSize: 18,
    marginTop: 10,
  },
  buttonSection: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  callButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
  },
  declineButton: {
    backgroundColor: "#FF3B30", // Apple/Android standard warning red
  },
  acceptButton: {
    backgroundColor: "#34C759", // Apple/Android standard success green
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 110, // Pushes text directly underneath the floating circular buttons
    position: "absolute",
  },
});
