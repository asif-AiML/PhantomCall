import { AudioPlayer, createAudioPlayer } from "expo-audio";

// These sit in the Back Room's memory to keep track of the active alarm and timer
let playerObject: AudioPlayer | null = null;
let timerId: ReturnType<typeof setTimeout> | null = null;

/**
 * Starts the silent countdown, then triggers the UI and plays the audio.
 * @param delaySeconds How long to wait before ringing
 * @param triggerRingUI A callback function the Engine shouts to the HomeScreen
 */
// Add ringtoneUri as the third parameter
export const startFakeCallTimer = (
  delaySeconds: number,
  triggerRingUI: () => void,
  ringtoneUri: string | null,
) => {
  if (timerId) clearTimeout(timerId);

  timerId = setTimeout(() => {
    try {
      triggerRingUI();

      // The Engine Logic: Use custom URI if it exists, otherwise use the baked-in asset
      const audioSource = ringtoneUri
        ? ringtoneUri
        : require("../../assets/ringtone.mp3");

      playerObject = createAudioPlayer(audioSource);
      playerObject.loop = true;
      playerObject.play();
    } catch (error) {
      console.error("Error playing ringtone:", error);
    }
  }, delaySeconds * 1000);
};

/**
 * Instantly kills the timer and stops the audio to prevent memory leaks.
 */
export const stopFakeCall = () => {
  // 1. Stop the clock if the user cancels early
  if (timerId) clearTimeout(timerId);

  // 2. Unload the audio from the phone's RAM using modern disposal methods
  if (playerObject) {
    playerObject.pause();

    // In expo-audio, imperative players must be explicitly removed and released to clear the C++ memory pool
    if (typeof playerObject.remove === "function") playerObject.remove();
    if (typeof playerObject.release === "function") playerObject.release();

    playerObject = null; // Wipe the memory slate clean
  }
};
