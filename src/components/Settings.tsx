import MaterialIcons from "@react-native-vector-icons/material-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

// Update the nervous system to accept the new state from index.tsx
interface SettingsProps {
  onClose: () => void;
  currentRingtoneName: string;
  onSelectRingtone: (uri: string, name: string) => void;
  currentImageUri: string | null;
  onSelectImage: (uri: string) => void;
  currentCallerName: string;
  onChangeName: (name: string) => void;
  onOpenAbout: () => void;
  currentPhoneNumber: string;
  onChangePhoneNumber: (number: string) => void;
}

export default function Settings({
  onClose,
  currentRingtoneName,
  onSelectRingtone,
  currentImageUri,
  onSelectImage,
  currentCallerName,
  onChangeName,
  onOpenAbout,
  currentPhoneNumber,
  onChangePhoneNumber,
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

  // --- Image Picker Engine ---
  const pickImage = async () => {
    try {
      // Ask the Android OS to open the gallery
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"], // Strictly images
        allowsEditing: true, // Opens the native cropping tool
        aspect: [1, 1], // Forces a perfect square crop
        quality: 0.8, // Compresses slightly to save RAM
      });

      if (!result.canceled && result.assets.length > 0) {
        onSelectImage(result.assets[0].uri); // Send the local URI back to index.tsx
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>Phantom Settings</Text>
      </View>

      {/* 2. THE FLEXIBLE MIDDLE (Scrollable) */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled" // Dismisses keyboard if you tap outside the inputs
      >
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
        {/* IMAGE PICKER ROW */}
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingLabel}>Caller Image</Text>
            <Text style={styles.settingValue}>
              {currentImageUri ? "Custom Image Set" : "Default Avatar"}
            </Text>
          </View>

          {/* Mini Preview: Only shows if an image is selected */}
          {currentImageUri && (
            <Image
              source={{ uri: currentImageUri }}
              style={styles.miniPreview}
            />
          )}

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={pickImage}
          >
            <Text style={styles.actionButtonText}>
              {currentImageUri ? "Change" : "Select"}
            </Text>
          </Pressable>
        </View>

        {/* CALLER NAME ROW */}
        {/* CUSTOM NAME ROW */}
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingLabel}>Caller Name</Text>
            <TextInput
              style={styles.textInput}
              value={currentCallerName}
              onChangeText={onChangeName}
              placeholder="Enter fake name..."
              placeholderTextColor="#5f6368"
              maxLength={30}
            />
          </View>
        </View>

        {/*Custom phone number row*/}
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={currentPhoneNumber}
              onChangeText={onChangePhoneNumber}
              placeholder="Enter fake phone number..."
              placeholderTextColor="#5f6368"
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>
        </View>

      </ScrollView>  
        <View style={styles.footer} />

        {/* ABOUT BUTTON ROW */}
        <Pressable
          style={({ pressed }) => [
            styles.aboutRow,
            pressed && styles.buttonPressed,
          ]}
          onPress={onOpenAbout}
        >
          <MaterialIcons name="info-outline" size={24} color="#ffffff" />
          <Text style={styles.aboutText}>About PhantomCall</Text>
          <MaterialIcons name="chevron-right" size={24} color="#5f6368" />
        </Pressable>

      

    </KeyboardAvoidingView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, 
  },
  // --- New Settings Row Styles ---
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 26,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 34,
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
  miniPreview: {
    width: 36,
    height: 36,
    borderRadius: 18, // Perfect circle
    marginRight: 12,
    backgroundColor: "#333",
  },
  textInput: {
    color: "#20a359",
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginTop: 5,
  },
  aboutRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  aboutText: {
    flex: 1,
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "500",
    marginLeft: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30, // Extra padding for the absolute bottom of the screen
    paddingTop: 10,
    backgroundColor: '#121212', // Matches container to blend in
  },
});
