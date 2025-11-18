import { SoundsFileType } from "../../types/sound.ts";
import { SoundController } from "../controller/soundController.ts";

// Preloaded sounds
const sounds: SoundsFileType = {
  shot: new Audio("sounds/shot.wav"),
  explosion: new Audio("sounds/explosion.wav"),
};

type SoundName = keyof SoundsFileType;

// Function to play a sound by name
export function playSound(soundName: SoundName) {
  if (SoundController.isSoundMuted()) {
    return; // If muted, don't play anything
  }

  const sound = sounds[soundName];
  if (sound) {
    sound.currentTime = 0; // Reset audio to start
    sound.play();
  } else {
    console.error(`Sound "${soundName}" not found.`);
  }
}
