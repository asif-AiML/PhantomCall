import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

interface AboutProps {
  onClose: () => void;
}

export default function About({ onClose }: AboutProps) {
  // Functions to open native Android apps
  const openGitHub = () =>
    Linking.openURL("https://github.com/asif-AiML/PhantomCall"); // Update this link!
  const sendEmail = () => Linking.openURL("mailto:muhammad.asif.ce@gmail.com"); // Update this email!

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <View style={styles.content}>
        {/* App Version */}
        <View style={styles.logoContainer}>
          <MaterialIcons name="phonelink-ring" size={80} color="#20a359" />
          <Text style={styles.appName}>PhantomCall</Text>
          <Text style={styles.versionText}>V2</Text>
        </View>

        <View style={styles.divider} />

        {/* Developer Info */}
        <View style={styles.infoSection}>
          <Text style={styles.stylishDevText}>Developer: Muhammad Asif</Text>

          <Pressable style={styles.linkButton} onPress={sendEmail}>
            <MaterialIcons name="email" size={24} color="#9aa0a6" />
            <Text style={styles.linkText}>Contact via Email</Text>
          </Pressable>

          <Pressable style={styles.linkButton} onPress={openGitHub}>
            <MaterialIcons name="code" size={24} color="#9aa0a6" />
            <Text style={styles.linkText}>View Source on GitHub</Text>
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
    alignItems: "center",
    padding: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  appName: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 10,
  },
  versionText: {
    fontSize: 18,
    color: "#20a359",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#333333",
    marginBottom: 30,
  },
  infoSection: {
    width: "100%",
    alignItems: "center",
  },
  stylishDevText: {
    fontSize: 22,
    color: "#ffffff",
    // fontStyle: "italic",
    marginBottom: 30,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "100%",
    marginBottom: 16,
    elevation: 2,
  },
  linkText: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 12,
  },
});
