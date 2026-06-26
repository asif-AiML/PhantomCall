import { useState } from "react";
import { BackHandler, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. Import your hollow UI bricks
import CallScreen from "../components/CallScreen";
import { TimerMenu } from "../components/TimerMenu";

// 2. Import your Back Room logic
import { startFakeCallTimer, stopFakeCall } from "../utils/fakeCallEngine";

export default function HomeScreen() {
  // ==========================================
  // THE BULLETIN BOARD (State)
  // ==========================================
  const [appStage, setAppStage] = useState<"SETUP" | "WAITING" | "RINGING">(
    "SETUP",
  );

  // ==========================================
  // WORKER 1: Start the stealth countdown
  // ==========================================
  const handleStartTimer = (seconds: number) => {
    // 1. Change the screen to pitch black immediately
    setAppStage("WAITING");

    // 2. Tell the Engine to start the clock, and hand it the alarm trigger
    startFakeCallTimer(seconds, () => {
      // This is the alarm trigger! The Engine runs this exact code when the clock hits zero.
      setAppStage("RINGING");
    });
  };

  // ==========================================
  // WORKER 2: The Escape Route
  // ==========================================
  const handleEndCall = () => {
    // 1. Kill the audio in the Back Room
    stopFakeCall();
    // 2. Nuke the app (Dump user to the Android home screen)
    BackHandler.exitApp();
  };

  // ==========================================
  // THE DUMB UI (Conditional Rendering)
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      {/* Hide the phone clock/battery during WAITING and RINGING for maximum immersion */}
      <StatusBar hidden={appStage !== "SETUP"} />

      {/* STAGE 1: The Setup Menu */}
      {appStage === "SETUP" && (
        <View style={styles.menuContainer}>
          <TimerMenu onSelectTimer={handleStartTimer} />
        </View>
      )}

      {/* STAGE 2: The Waiting Room (Pure Pitch Black Screen) */}
      {appStage === "WAITING" && <View style={styles.blackScreen} />}

      {/* STAGE 3: The Fake Call */}
      {appStage === "RINGING" && <CallScreen onEndCall={handleEndCall} />}
    </SafeAreaView>
  );
}

// ==========================================
// THE PAINT
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Deep black for stealth
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  blackScreen: {
    flex: 1,
    backgroundColor: "#000", // Perfectly mimics a locked/sleeping phone display
  },
});
