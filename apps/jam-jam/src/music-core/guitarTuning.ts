import {
  StringInstrumentTuning,
  StringInstrumentTuningId,
  StringInstrumentTuningType,
  Note,
} from "./definitions";

export class GuitarTuning implements StringInstrumentTuning {
  constructor(
    public name: string,
    public type: StringInstrumentTuningType,
    public notes: Note[],
    public id: StringInstrumentTuningId
  ) {}
}
