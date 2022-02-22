import { error } from "dk";
import {
  Guitar,
  StringInstrument,
  StringInstrumentHand,
  StringInstrumentTuning,
} from "music-core";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useGuitarTuningsProvider } from "../guitar-tunings";

interface GuitarProviderProps {
  children: ReactNode;
}

interface FretboardVisualizationContext {
  guitar: StringInstrument;
  changeNotesCount: (notesCount: number) => void;
  changeHand: (hand: StringInstrumentHand) => void;
  changeTuning: (tuning: StringInstrumentTuning) => void;
}

const Context = createContext<FretboardVisualizationContext | null>(null);

export const GuitarProvider = ({ children }: GuitarProviderProps) => {
  const { E_STANDARD } = useGuitarTuningsProvider();
  const [guitar, setGuitar] = useState(new Guitar(E_STANDARD));

  const changeNotesCount = (notesCount: number) => {
    setGuitar(guitar.changeNotesCount(notesCount));
  };

  const changeHand = (hand: StringInstrumentHand) => {
    setGuitar(guitar.changeHand(hand));
  };

  const changeTuning = (tuning: StringInstrumentTuning) => {
    setGuitar(guitar.changeTuning(tuning));
  };

  const value: FretboardVisualizationContext = useMemo(() => {
    return {
      guitar,
      changeNotesCount,
      changeHand,
      changeTuning,
    };
  }, [guitar]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useGuitarProvider = (): FretboardVisualizationContext => {
  const context = useContext(Context);

  if (context === null) {
    throw error("LACK_OF_PROVIDER", `There is lack of ${GuitarProvider.name}`);
  }

  return context;
};
