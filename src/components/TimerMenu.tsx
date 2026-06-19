import { Pressable, StyleSheet, Text, View } from "react-native";

interface TimerMenuProps {
  onSelectTimer: (seconds: number) => void;
}

export function TimerMenu({ onSelectTimer }: TimerMenuProps) {
  // A clean array of options so we don't have to copy/paste buttons
  const timeOptions = [
    { label: "10 Seconds", value: 10 },
    { label: "30 Seconds", value: 30 },
    { label: "1 Minute", value: 60 },
    { label: "5 Minutes", value: 300 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SELECT ESCAPE TIMER</Text>
      <Text style={styles.subtitle}>App will go dark. Wait for the ring.</Text>

      {timeOptions.map((option) => (
        <Pressable
          key={option.value}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onSelectTimer(option.value)}
        >
          <Text style={styles.buttonText}>{option.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#111",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  header: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#1A1A1A",
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#0a7ea4",
    borderColor: "#00FF41",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
