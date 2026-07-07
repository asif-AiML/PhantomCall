import { useState } from "react";
import { BackHandler, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import About from "../components/About";
import CallScreen from "../components/CallScreen";
import OngoingCall from "../components/OngoingCall";
import Settings from "../components/Settings";
import { TimerMenu } from "../components/TimerMenu";

// Engine
import { startFakeCallTimer, stopFakeCall } from "../utils/fakeCallEngine";

// 1. Expand the brain to include Stage 4
type AppStage =
  | "SETUP"
  | "WAITING"
  | "RINGING"
  | "ONGOING"
  | "SETTINGS"
  | "ABOUT";

export default function Index() {
  const [appStage, setAppStage] = useState<AppStage>("SETUP");
  const [ringtoneUri, setRingtoneUri] = useState<string | null>(null);
  const [ringtoneName, setRingtoneName] = useState<string>("Default Ringtone");
  const [callerImageUri, setCallerImageUri] = useState<string | null>(null);
  const [callerName, setCallerName] = useState<string>("UNKNOWN CALLER");
  const [phoneNumber, setPhoneNumber] = useState<string>("03XX XXXXXXX"); // Placeholder

  // Triggered by TimerMenu
  const handleStartTimer = (seconds: number) => {
    setAppStage("WAITING");
    startFakeCallTimer(
      seconds,
      () => {
        setAppStage("RINGING");
      },
      ringtoneUri,
    ); // Pass the URI to the engine
  };

  // Triggered by the Red Button (Decline on CallScreen OR End on OngoingCall)
  const handleEndCall = () => {
    stopFakeCall(); // Kills the ringtone and wipes the memory
    BackHandler.exitApp(); // Instantly terminates the app and returns to Android Home
  };

  // Triggered by the Green Button (Answer on CallScreen)
  const handleAnswerCall = () => {
    stopFakeCall(); // Kills the ringing audio so it doesn't play during the "call"
    setAppStage("ONGOING"); // Pushes to Stage 4
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hide the phone clock/battery during WAITING, RINGING, and ONGOING for maximum immersion */}
      <StatusBar hidden={appStage !== "SETUP"} />

      {/* STAGE 1: The Setup Menu */}
      {appStage === "SETUP" && (
        <View style={styles.menuContainer}>
          <TimerMenu
            onSelectTimer={handleStartTimer}
            onOpenSettings={() => setAppStage("SETTINGS")}
          />
        </View>
      )}

      {/* STAGE 2: The Waiting Room (Pure Pitch Black Screen) */}
      {appStage === "WAITING" && <View style={styles.blackScreen} />}

      {/* STAGE 3: The Fake Call (Ringing) */}
      {appStage === "RINGING" && (
        <CallScreen
          onEndCall={handleEndCall}
          onAnswerCall={handleAnswerCall}
          callerImageUri={callerImageUri}
          callerName={callerName}
          phoneNumber={phoneNumber}
        />
      )}

      {/* STAGE 4: The Active Call (Talking) */}
      {appStage === "ONGOING" && (
        <OngoingCall
          onEndCall={handleEndCall}
          callerImageUri={callerImageUri}
          callerName={callerName}
          
        />
      )}

      {/* STAGE 5: The Settings Menu */}
      {appStage === "SETTINGS" && (
        <Settings
          onClose={() => setAppStage("SETUP")}
          currentRingtoneName={ringtoneName}
          onSelectRingtone={(uri, name) => {
            setRingtoneUri(uri);
            setRingtoneName(name);
          }}
          currentImageUri={callerImageUri}
          onSelectImage={(uri) => setCallerImageUri(uri)}
          currentCallerName={callerName}
          onChangeName={(name) => setCallerName(name)}
          onOpenAbout={() => setAppStage("ABOUT")}
          currentPhoneNumber={phoneNumber} // Placeholder for the current phone number
          onChangePhoneNumber={(number) => setPhoneNumber(number)}
        />
      )}

      {appStage === "ABOUT" && (
        <About onClose={() => setAppStage("SETTINGS")} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blackScreen: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
