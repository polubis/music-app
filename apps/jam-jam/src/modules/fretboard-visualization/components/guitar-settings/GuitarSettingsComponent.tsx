import {
  BgColorsOutlined,
  FontSizeOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Switch, Tooltip, Divider } from "antd";
import {
  useGuitarProvider,
  useGuitarSettingsProvider,
} from "modules/fretboard-visualization/providers";
import { GuitarTuningPickerComponent } from "../guitar-tuning-picker";
import { NoteNotationSymbol } from "music-core";
import { useTranslation } from "react-i18next";
import { NotesCountPickerComponent } from "../notes-count-picker";
import { NotesRangePickerComponent } from "../notes-range-picker";
import css from "./GuitarSettingsComponent.module.less";

interface GuitarSettingsComponentProps {
  onSoundEnabledChange: () => void;
}

const GuitarSettingsComponent = ({
  onSoundEnabledChange,
}: GuitarSettingsComponentProps) => {
  const { guitar, changeNotesCount, changeHand } = useGuitarProvider();
  const {
    singleColor,
    soundEnabled,
    octavesDisplayed,
    notation,
    availableFrets,
    toggleFilterProp,
    changeAvailableFrets,
  } = useGuitarSettingsProvider();
  const { t } = useTranslation();

  return (
    <section className={css.root}>
      <div className={css.buttons}>
        <GuitarTuningPickerComponent />
        <NotesRangePickerComponent
          value={availableFrets}
          max={guitar.notesCount}
          onChange={changeAvailableFrets}
        />
        <NotesCountPickerComponent
          value={guitar.notesCount}
          onChange={changeNotesCount}
        />
      </div>
      <Divider className={css.divider} type="vertical" />
      <div className={css.switches}>
        <Tooltip title={t("Turns on/off sound")}>
          <Switch
            checkedChildren={<SoundOutlined />}
            unCheckedChildren={<SoundOutlined />}
            checked={soundEnabled}
            onChange={onSoundEnabledChange}
          />
        </Tooltip>
        <Tooltip title={t("Changes guitar orientation to left handed")}>
          <Switch
            checked={guitar.hand === "left"}
            checkedChildren={t("Left")}
            unCheckedChildren={t("Left")}
            onChange={() =>
              changeHand(guitar.hand === "right" ? "left" : "right")
            }
          />
        </Tooltip>
        <Tooltip title={t("Shows/hides octaves numbers in notes")}>
          <Switch
            className={css.switch}
            checked={octavesDisplayed}
            checkedChildren={<FontSizeOutlined />}
            unCheckedChildren={<FontSizeOutlined />}
            onChange={() => toggleFilterProp("octavesDisplayed")}
          />
        </Tooltip>
        <Tooltip title={t("Changes notes notation")}>
          <Switch
            checked={notation === NoteNotationSymbol.Bmoll}
            checkedChildren={NoteNotationSymbol.Bmoll}
            unCheckedChildren={NoteNotationSymbol.Bmoll}
            onChange={() => toggleFilterProp("notation")}
          />
        </Tooltip>
        <Tooltip title={t("Single notes color")}>
          <Switch
            checked={singleColor}
            checkedChildren={<BgColorsOutlined />}
            unCheckedChildren={<BgColorsOutlined />}
            onChange={() => toggleFilterProp("singleColor")}
          />
        </Tooltip>
      </div>
    </section>
  );
};

export { GuitarSettingsComponent };
