import { useEffect, useRef, useState } from "react";
import { Note } from "music-core";

const CONFIG = {
  urls: {
    A2: "A2.mp3",
  },
  release: 1,
  volume: 0.12,
  baseUrl: `${window.location.origin}/guitar/`,
};

export const useNotesPlay = () => {
  const tone = useRef<typeof import("tone")>();

  const sampler = useRef<import("tone").Sampler>();

  const audioReady = !!sampler.current;
  const [preparingAudio, setPreparingAudio] = useState(false);

  const prepareAudio = (onReady: () => void = () => {}): void => {
    if (audioReady) {
      onReady();
      return;
    }

    setPreparingAudio(true);

    import("tone").then((Tone) => {
      sampler.current = new Tone.Sampler(CONFIG).toDestination();
      tone.current = Tone;

      Tone.loaded().then(() => {
        setPreparingAudio(false);
        onReady();
      });
    });
  };

  const playNote = (note: Note): void => {
    prepareAudio(() => {
      sampler.current!.triggerAttackRelease(
        `${note.sharpName}${note.octave}`,
        1
      );
    });
  };

  const playSequence = (notes: Note[]): void => {
    prepareAudio(() => {
      const seq = new tone.current!.Sequence(
        (time, note) => {
          sampler.current!.triggerAttackRelease(note, 0.1, time);
        },
        notes.map((note) => `${note.sharpName}${note.octave}`)
      ).start(0);
      seq.loop = false;
      tone.current!.Transport.stop();
      tone.current!.Transport.start();
    });
  };

  useEffect(() => {
    return () => {
      sampler.current?.disconnect();
    };
  }, []);

  return {
    preparingAudio,
    prepareAudio,
    playNote,
    playSequence,
  };
};
