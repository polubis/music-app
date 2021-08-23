import { GuitarString } from "../models";

export const _STRING_: GuitarString = {
  position: 0,
  sounds: [
    {
      note: {
        name: "C",
        position: 0,
      },
      fret: 0,
      theme: {
        background: "red",
        color: "#fff",
      },
    },
  ],
};

export const stringsMockBuilder = (strings = [_STRING_]) => {
  return {
    add: (string: Partial<GuitarString>) =>
      stringsMockBuilder([...strings, { ..._STRING_, ...string }]),
    valueOf: () => strings,
  };
};

export const _SIX_STRINGS_ = stringsMockBuilder()
  .add({ position: 2 })
  .add({
    position: 3,
  })
  .add({ position: 4 })
  .add({ position: 5 })
  .add({ position: 6 })
  .valueOf();
