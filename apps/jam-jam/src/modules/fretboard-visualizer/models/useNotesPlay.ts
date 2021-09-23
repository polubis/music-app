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
      const synth = new Tone.PluckSynth().toDestination();
      synth.triggerAttackRelease(`${note.name}${note.octave}`, "8n");
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
