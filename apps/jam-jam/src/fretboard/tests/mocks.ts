import { GuitarSound, GuitarString, NoteName, NOTE_NAMES } from "../models";

const _DEFAULT_SOUND_: GuitarSound = {
  fret: 0,
  note: {
    name: "C",
    position: 0,
  },
  hidden: false,
};

export const GuitarSoundMock = (sound = _DEFAULT_SOUND_) => {
  return {
    setHidden: (hidden: boolean) => GuitarSoundMock({ ...sound, hidden }),
    setFret: (fret: number) => GuitarSoundMock({ ...sound, fret }),
    setNote: (name: NoteName, position: number) =>
      GuitarSoundMock({
        ...sound,
        note: {
          name,
          position,
        },
      }),
    valueOf: () => sound,
  };
};

const _DEFAULT_STRING_: GuitarString = {
  position: 0,
  sounds: [],
  hidden: false,
};

export const GuitarStringMock = (string = _DEFAULT_STRING_) => {
  return {
    setSoundsHidden: (names: NoteName[], hidden: boolean) =>
      GuitarStringMock({
        ...string,
        sounds: string.sounds.map((sound) =>
          GuitarSoundMock(sound)
            .setHidden(names.includes(sound.note.name) ? hidden : false)
            .valueOf()
        ),
      }),
    setPosition: (position: number) =>
      GuitarStringMock({ ...string, position }),
    fillSounds: (start: NoteName, count: number) => {
      const sounds: GuitarSound[] = [];
      let acc = NOTE_NAMES.findIndex((note) => note === start);

      for (let i = 0; i < count; i++) {
        sounds.push({
          fret: i,
          note: {
            name: NOTE_NAMES[acc],
            position: acc,
          },
          hidden: false,
        });

        const nextAcc = acc + 1;
        acc = nextAcc > NOTE_NAMES.length - 1 ? 0 : nextAcc;
      }

      return GuitarStringMock({
        ...string,
        sounds,
      });
    },
    valueOf: () => string,
  };
};

export const GuitarStringsMock = (strings: GuitarString[] = []) => {
  return {
    fromNames: (names: NoteName[], count: number) => {
      const strings: GuitarString[] = names.map((name, idx) =>
        GuitarStringMock().setPosition(idx).fillSounds(name, count).valueOf()
      );

      return GuitarStringsMock(strings);
    },
    setSoundsHidden: (names: NoteName[], hidden: boolean) => {
      const result = strings.map((string) => ({
        ...string,
        sounds: string.sounds.map((sound) =>
          GuitarSoundMock(sound)
            .setHidden(names.includes(sound.note.name) ? hidden : false)
            .valueOf()
        ),
      }));

      return GuitarStringsMock(result);
    },
    valueOf: () => strings,
  };
};
