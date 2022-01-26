import { error } from "dk";
import { createContext, ReactNode, useContext } from "react";
import { useGuitarSettings } from "./useGuitarSettings";

interface GuitarSettingsProviderProps {
  children: ReactNode;
}

type GuitarSettingsContext = ReturnType<typeof useGuitarSettings>;

const Context = createContext<GuitarSettingsContext | null>(null);

export const GuitarSettingsProvider = ({
  children,
}: GuitarSettingsProviderProps) => {
  const value = useGuitarSettings();
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useGuitarSettingsProvider = (): GuitarSettingsContext => {
  const context = useContext(Context);

  if (context === null) {
    throw error(
      "LACK_OF_PROVIDER",
      `There is lack of ${GuitarSettingsProvider.name}`
    );
  }

  return context;
};
