import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import SlideUpView from './SlideUpView';

interface OnboardingProps {
  onFinish: () => void;
}

const SCREENS = [
  {
    heading: "The Perfect Escape",
    body: "Ever found yourself trapped in a conversation you couldn't politely leave? You check your phone, wishing someone—anyone—would call to give you a clean exit. If you know that feeling, you are in the right place.",
    button: "Continue",
    quote: null
  },
  {
    heading: "Your Exit Strategy",
    body: "PhantomCall delivers a flawless, simulated incoming call exactly when you need it. Customize the caller name, photo, and ringtone to match your reality. Set a stealth timer, slip your phone back in your pocket, and wait for your cue to step away.",
    button: "Next",
    quote: null
  },
  {
    heading: "Zero Ads. Zero Tracking.",
    body: "Most utility apps are flooded with intrusive ads and secretly harvest your personal data. PhantomCall respects your device. It is completely ad-free, tracks absolutely nothing, and operates 100% offline.",
    button: "Next",
    quote: null
  },
  {
    heading: "Verifiably Secure",
    body: "Don't just take our word for it. The architecture is entirely open-source. Inspect the code, verify our privacy claims, or contribute to the repository via the Settings menu.",
    button: "Initialize PhantomCall",
    quote: "“Privacy is the power to selectively reveal oneself to the world.” — Eric Hughes"
  }
];

export default function Onboarding({ onFinish }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const handleNext = async () => {
    if (step < SCREENS.length - 1) {
      setStep(step + 1);
    } else {
      // Final button clicked: write the memory flag and trigger onFinish
      try {
        await AsyncStorage.setItem('@has_launched_v2', 'true');
        onFinish();
      } catch (error) {
        console.error("Failed to save launch flag", error);
        onFinish(); // Still let them in even if storage fails
      }
    }
  };

  const currentData = SCREENS[step];

  return (
    <View style={styles.container}>
      <SlideUpView key={step}> 
        {/* The 'key' forces React to rebuild and re-trigger the slide animation every time the step changes */}
        <View style={styles.content}>
          <MaterialIcons name="phonelink-ring" size={80} color="#20a359" style={styles.icon} />
          
          <Text style={styles.heading}>{currentData.heading}</Text>
          <Text style={styles.body}>{currentData.body}</Text>
          
          {currentData.quote && (
            <Text style={styles.quote}>{currentData.quote}</Text>
          )}

          <View style={{ flex: 1 }} />

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {SCREENS.map((_, index) => (
              <View key={index} style={[styles.dot, step === index && styles.activeDot]} />
            ))}
          </View>

          {/* Action Button */}
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleNext}>
            <Text style={styles.buttonText}>{currentData.button}</Text>
            {step === SCREENS.length - 1 ? (
              <MaterialIcons name="done" size={24} color="#ffffff" style={{ marginLeft: 8 }} />
            ) : (
              <MaterialIcons name="arrow-forward" size={24} color="#ffffff" style={{ marginLeft: 8 }} />
            )}
          </Pressable>
        </View>
      </SlideUpView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  icon: {
    marginTop: 60,
    marginBottom: 40,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 28,
    color: '#20a359',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  body: {
    fontSize: 18,
    color: '#ffffff',
    lineHeight: 28,
    textAlign: 'center',
  },
  quote: {
    marginTop: 40,
    fontSize: 16,
    color: '#9aa0a6',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#20a359',
    width: 24, // Elongates the active dot for a sleek modern look
  },
  button: {
    backgroundColor: '#20a359',
    flexDirection: 'row',
    paddingVertical: 18,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});