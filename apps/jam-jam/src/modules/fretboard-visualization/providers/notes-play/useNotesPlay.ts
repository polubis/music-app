import { Note } from "music-core";
import { Transport, Sampler, now } from "tone";

const CONFIG = {
  urls: {
    A2: "A2.mp3",
  },
  release: 1,
  volume: 0.12,
  baseUrl: `${window.location.origin}/guitar/`,
};

const sampler = new Sampler(CONFIG).toDestination();

const play = (notes: Note[], duration: number, time: number): void => {
  const n = now();

  notes
    .map((note) => `${note.sharpName}${note.octave}`)
    .forEach((note, i) => {
      sampler.triggerAttackRelease(note, duration, n + i * time);
    });

  Transport.on("loopEnd", () => {
    console.log("paused");
  });
};

export const useNotesPlay = (duration = 0.1, time = 0.25) => {
  const playNotes = (value: Note | Note[]): void => {
    const notes = Array.isArray(value) ? value : [value];
    play(notes, duration, time);
  };

  return { playNotes };
};
