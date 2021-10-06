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
      title={t("WhatsAdded") + "?"}
      visible
      onOk={onOk}
      okText={t("Ok")}
      cancelText={t("Close")}
      onCancel={onCancel}
    >
      <Timeline>
        <Timeline.Item color="green">
          <p>Notes notation switch</p>
          <p>Guitar orientation switch</p>
          <p>Option to filter visible notes</p>
          <p>Option to display visible notes</p>
          <p>Support for mobile devices</p>
          <p>Option to setup guitar tuning</p>
          <p>Option to maintain number of guitar strings and frets</p>
          <p>Adding an opinion form to send a review</p>
          <p>Add option to pick scale on fretboard</p>
          <p>Improve fretboard scroll on mobiles / desktop</p>
          <p>Add option to save fretboard state and use it later</p>
        </Timeline.Item>
        <Timeline.Item color="green">
          <p>Polish language support</p>
          <p>Improve notes range picking</p>
          <p>Add option to play note in speakers</p>
          <p>Improve display on desktop and mobile</p>
          <p>Improve guitar orientation change</p>
          <p>Add option to display octaves</p>
          <p>Add new scales</p>
        </Timeline.Item>
        <Timeline.Item color="green">
          <p>Improve initial load performance</p>
          <p>Add octave pick on tuning change</p>
          <p>Add highlight of picked scale</p>
          <p>Improve fretboard UX</p>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <p>Add option to log in and create account</p>
          <p>Improve initial load performance</p>
          <p>Add option to pick chords on fretboard</p>
          <p>Add option to play chords in speakers</p>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <p>Apply new design</p>
          <p>Create fretboard visualization game</p>
          <p>Improve user experience in fretboard visualizer module</p>
          <p>Add additional visualization of scales and chords</p>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <p>Add 2v2 fretboard visualization game</p>
          <p>Add perfect pitch game</p>
        </Timeline.Item>
      </Timeline>
    </Modal>
  );
};

export { ChangelogModal };
