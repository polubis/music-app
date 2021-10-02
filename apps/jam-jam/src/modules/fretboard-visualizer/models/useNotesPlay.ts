import { useState } from "react";
import { Note } from "./defs";

const CONFIG = {
  urls: {
    A2: "A2.mp3",
  },
  release: 1,
  volume: 0.12,
  baseUrl: `${window.location.origin}/guitar/`,
};

export const useNotesPlay = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);

  const enable = (): void => {
    setIsEnabling(true);
    import("tone").then(() => {
      setIsEnabled(true);
      setIsEnabling(false);
    });
  };

  const disable = (): void => {
    setIsEnabled(false);
  };

  const play = (note: Note): void => {
    import("tone").then((Tone) => {
      const sampler = new Tone.Sampler(CONFIG).toDestination();

      Tone.loaded().then(() => {
        sampler.triggerAttackRelease(`${note.name}${note.octave}`, 1);
      });
    });
  };

  const playMany = (notes: Note[]): void => {
    import("tone").then((Tone) => {
      const sampler = new Tone.Sampler(CONFIG).toDestination();

      Tone.loaded().then(() => {
        const now = Tone.now();
        notes.forEach((note, idx) => {
          sampler.triggerAttack(
            `${note.name}${note.octave}`,
            now + 0.2 * (idx + 1)
          );
        });
        sampler.triggerRelease(
          notes.map((note) => note.name),
          now + 1
        );
      });
    });
  };

  const update = (): void => {
    isEnabled ? disable() : enable();
  };

  return {
    update,
    play,
    playMany,
    isEnabling,
    isEnabled,
  };
};
