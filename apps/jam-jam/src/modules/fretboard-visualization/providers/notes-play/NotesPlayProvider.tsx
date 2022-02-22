import { error } from "dk";
import { createContext, ReactNode, useContext } from "react";
import { useNotesPlay } from "./useNotesPlay";

interface NotesPlayProviderProps {
  children: ReactNode;
}

type GuitarTuningsContext = ReturnType<typeof useNotesPlay>;

const Context = createContext<GuitarTuningsContext | null>(null);

export const NotesPlayProvider = ({ children }: NotesPlayProviderProps) => {
  const value = useNotesPlay();
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useNotesPlayProvider = (): GuitarTuningsContext => {
  const context = useContext(Context);

  if (context === null) {
    throw error(
      "LACK_OF_PROVIDER",
      `There is lack of ${NotesPlayProvider.name}`
    );
  }

  return context;
};
