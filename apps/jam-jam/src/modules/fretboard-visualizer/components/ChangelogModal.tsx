import { Timeline } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useTranslation } from "react-i18next";

interface ChangelogModalProps {
  onOk: () => void;
  onCancel: () => void;
}

const ChangelogModal = ({ onOk, onCancel }: ChangelogModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("What's added") + "?"}
      visible
      onOk={onOk}
      okText={t("Ok")}
      cancelText={t("Close")}
      onCancel={onCancel}
    >
      <Timeline>
        <Timeline.Item color="green">
          <p>{t("Notes notation switch")}</p>
          <p>{t("Guitar orientation switch")}</p>
          <p>{t("Option to filter visible notes")}</p>
          <p>{t("Option to display visible notes")}</p>
          <p>{t("Support for mobile devices")}</p>
          <p>{t("Option to setup guitar tuning")}</p>
          <p>{t("Option to maintain number of guitar strings and frets")}</p>
          <p>{t("Adding an opinion form to send a review")}</p>
          <p>{t("Add option to pick scale on fretboard")}</p>
          <p>{t("Improve fretboard scroll on mobiles / desktop")}</p>
          <p>{t("Add option to save fretboard state and use it later")}</p>
        </Timeline.Item>
        <Timeline.Item color="green">
          <p>{t("Polish language support")}</p>
          <p>{t("Improve notes range picking")}</p>
          <p>{t("Add option to play note in speakers")}</p>
          <p>{t("Improve display on desktop and mobile")}</p>
          <p>{t("Improve guitar orientation change")}</p>
          <p>{t("Add option to display octaves")}</p>
          <p>{t("Add new scales")}</p>
        </Timeline.Item>
        <Timeline.Item color="green">
          <p>{t("Improve initial load performance")}</p>
          <p>{t("Add octave pick on tuning change")}</p>
          <p>{t("Add highlight of picked scale")}</p>
          <p>{t("Improve fretboard user experience")}</p>
          <p>{t("Add option to pick chords on fretboard")}</p>
          <p>{t("Add option to play chords in speakers")}</p>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <p>{t("Add option to log in and create account")}</p>
          <p>{t("Add chords which can be used in selected scale")}</p>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <p>{t("Apply new design")}</p>
          <p>{t("Create fretboard visualization game")}</p>
          <p>{t("Improve user experience in fretboard visualizer module")}</p>
          <p>{t("Add additional visualization of scales and chords")}</p>
          <p>{t("Add chords shapes visualization")}</p>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <p>{t("Add 2v2 fretboard visualization game")}</p>
          <p>{t("Add perfect pitch game")}</p>
        </Timeline.Item>
      </Timeline>
    </Modal>
  );
};

export { ChangelogModal };
