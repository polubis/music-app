import { useEffect, useRef, useState } from "react";
import { Sampler } from "tone";

export const useMetronome = (bpm: number) => {
  const [metronomePrepared, setMetronomePrepared] = useState(false);
  const [preparingMetronome, setPreparingMetronome] = useState(false);

  const tone = useRef<typeof import("tone")>();
  const [tick, setTick] = useState(1);
  const sampler = useRef<Sampler>();

  const prepareMetronome = (onReady: () => void): void => {
    if (!metronomePrepared) {
      setMetronomePrepared(false);
      setPreparingMetronome(true);

      import("tone").then((Tone) => {
        sampler.current = new Tone.Sampler({
          urls: {
            C2: "metronome.wav",
          },
          release: 1,
          volume: -16,
          baseUrl: `${window.location.origin}/metronome/`,
        }).toDestination();

        Tone.Transport.scheduleRepeat((time) => {
          sampler.current!.triggerAttackRelease("C2", "16n", time);
          setTick((prevTick) => (prevTick + 1 > 4 ? 1 : prevTick + 1));
        }, "4n");

        Tone.loaded().then(() => {
          tone.current = Tone;
          tone.current!.Transport.bpm.value = bpm;
          onReady();
          setPreparingMetronome(false);
          setMetronomePrepared(true);
        });
      });
    }
  };

  const toggleMetronome = (): void => {
    const handleTurnOn = (): void => {
      if (tone.current) {
        if (tone.current.Transport.state !== "started") {
          tone.current.Transport.start();
          return;
        }

        if (tone.current.Transport.state === "started") {
          tone.current.Transport.stop();
        }
      }
    };

    handleTurnOn();
    prepareMetronome(handleTurnOn);
  };

  useEffect(() => {
    if (tone.current) {
      tone.current!.Transport.bpm.value = bpm;
    }
  }, [bpm]);

  return {
    metronomePrepared,
    preparingMetronome,
    tick,
    toggleMetronome,
  };
};
