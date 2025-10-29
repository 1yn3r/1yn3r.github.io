
import { soundAssets } from '../constants';

export const soundManager = {
  isUnlocked: false,
  unlock() {
    if (this.isUnlocked) return;
    this.isUnlocked = true;
  },
  play(soundKey: string) {
    if (!this.isUnlocked || !soundAssets[soundKey]) return;
    const audio = new Audio(soundAssets[soundKey]);
    audio.volume = 0.5;
    audio.play().catch(e => { /* Ignore errors from rapid playback */ });
  }
};
