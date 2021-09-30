import { useState } from "react";
import { Note } from "./defs";

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
      const sampler = new Tone.Sampler({
        urls: {
          A2: "A2.mp3",
        },
        release: 1,
        volume: 0.25,
        baseUrl: "http://localhost:3000/guitar/",
      }).toDestination();

      Tone.loaded().then(() => {
        sampler.triggerAttackRelease(`${note.name}${note.octave}`, 1);
      });
    });
  };

  const update = (): void => {
    isEnabled ? disable() : enable();
  };

  return {
    update,
    play,
    isEnabling,
    isEnabled,
  };
};
