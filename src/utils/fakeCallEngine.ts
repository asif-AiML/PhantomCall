import { AudioPlayer, createAudioPlayer } from "expo-audio";

// These sit in the Back Room's memory to keep track of the active alarm and timer
let playerObject: AudioPlayer | null = null;
let timerId: ReturnType<typeof setTimeout> | null = null;

/**
 * Starts the silent countdown, then triggers the UI and plays the audio.
 * @param delaySeconds How long to wait before ringing
 * @param triggerRingUI A callback function the Engine shouts to the HomeScreen
 */
export const startFakeCallTimer = (
  delaySeconds: number,
  triggerRingUI: () => void,
) => {
  // Safety check: Cancel any existing timers before starting a new one
  if (timerId) clearTimeout(timerId);

  // The main setTimeout loop (JavaScript's built-in countdown tool)
  timerId = setTimeout(() => {
    try {
      // 1. Pull the fire alarm! Tell the HomeScreen to change its sticky note.
      triggerRingUI();

      // 2. Load the mp3 file directly from your assets folder using the modern engine
      playerObject = createAudioPlayer(require("../../assets/ringtone.mp3"));

      // 3. Keep ringing infinitely until the user interacts
      playerObject.loop = true;

      // 4. Hit Play (Notice we don't need 'await' anymore, it is synchronous!)
      playerObject.play();
    } catch (error) {
      console.error("Error playing ringtone:", error);
    }
  }, delaySeconds * 1000); // Math: setTimeout reads in milliseconds (1000ms = 1s)
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
