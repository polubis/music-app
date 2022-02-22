import { AvailableFrets, GuitarSettings } from "../../models";
import {
  getPosition,
  NoteNotationSymbol,
  NoteSymbol,
} from "music-core";
import { useEffect, useMemo, useState } from "react";
import { useGuitarProvider } from "../guitar";

export const useGuitarSettings = () => {
  const {
    guitar: { notesCount },
  } = useGuitarProvider();
  const [settings, setSettings] = useState<GuitarSettings>({
    octavesDisplayed: false,
    notation: NoteNotationSymbol.Sharp,
    singleColor: false,
    soundEnabled: false,
    hiddenNotes: {},
    availableFrets: [0, notesCount],
  });

  const toggleFilterProp = (
    key: keyof Omit<GuitarSettings, "hiddenNotes" | "availableFrets">
  ): void => {
    const notation =
      settings.notation === NoteNotationSymbol.Sharp
        ? NoteNotationSymbol.Bmoll
        : NoteNotationSymbol.Sharp;

    setSettings({
      ...settings,
      [key]: key === "notation" ? notation : !settings[key],
    });
  };

  const toggleHiddenNotes = (symbol: NoteSymbol): void => {
    const position = getPosition(symbol);
    setSettings({
      ...settings,
      hiddenNotes: {
        ...settings.hiddenNotes,
        [position]: settings.hiddenNotes[position] ? false : true,
      },
    });
  };

  const changeAvailableFrets = (availableFrets: AvailableFrets): void => {
    setSettings({
      ...settings,
      availableFrets,
    });
  };

  useEffect(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      availableFrets: [0, notesCount],
    }));
  }, [notesCount]);

  return useMemo(() => {
    return {
      ...settings,
      toggleFilterProp,
      toggleHiddenNotes,
      changeAvailableFrets,
    } as const;
  }, [settings]);
};
