import { error } from "dk";
import { createContext, ReactNode, useContext } from "react";
import { useGuitarTunings } from "./useGuitarTunings";

interface GuitarTuningsProviderProps {
  children: ReactNode;
}

type GuitarTuningsContext = ReturnType<typeof useGuitarTunings>;

const Context = createContext<GuitarTuningsContext | null>(null);

export const GuitarTuningsProvider = ({
  children,
}: GuitarTuningsProviderProps) => {
  const value = useGuitarTunings();
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useGuitarTuningsProvider = (): GuitarTuningsContext => {
  const context = useContext(Context);

  if (context === null) {
    throw error(
      "LACK_OF_PROVIDER",
      `There is lack of ${GuitarTuningsProvider.name}`
    );
  }

  return context;
};
