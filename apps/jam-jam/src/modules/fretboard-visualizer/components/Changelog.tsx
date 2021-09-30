import { Button, Collapse, Modal } from "antd";
import { useToggle } from "dk";

const { Panel } = Collapse;

const ChangeLog = () => {
  const [open, { toggle }] = useToggle();

  return (
    <>
      <Button type="primary" onClick={toggle}>
        Changelog
      </Button>
      <Modal
        title="What's added ?"
        visible={open}
        onOk={toggle}
        cancelText="Close"
        onCancel={toggle}
      >
        {/* ADD LAZY LOADING */}
        {/* ADD OCTAVE PICK ON TUNING CHANGE */}
        {/* ADD PROMPT IF NO SAMPLE FOR NOTE */}
        {/* ADD NEW BADGE */}
        {/* ADD OPTION TO DISPLAY CURRENTLY USED SCALE AND TUNING */}
        {/* PLAY NOTES SEQUENCE ON SCALE CHANGE AND TUNING CHANGE */}
        {/* THINK ABOUT CLICKING ITEMS FROM OUTER RANGE IN FRETS */}
        {/* ADD CONFIRM DELETE PROMPT */}
        {/* DISPLAY OCTAVES */}
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="Version 1.0.0 - done" key="1">
            <p>- Notes notation switch</p>
            <p>- Guitar orientation switch</p>
            <p>- Option to filter visible notes</p>
            <p>- Option to display visible notes</p>
            <p>- Support for mobile devices</p>
            <p>- Option to setup guitar tuning</p>
            <p>- Option to maintain number of guitar strings and frets</p>
            <p>- Adding an opinion form to send a review</p>
            <p>- Add option to pick scale on fretboard</p>
            <p>- Improve fretboard scroll on mobiles / desktop</p>
            <p>- Add option to save fretboard state and use it later</p>
          </Panel>
          <Panel header="Version 1.0.1 - working on" key="2">
            <p>- Polish language support</p>
            <p>- Improve notes range picking</p>
            <p>- Add option to play note in speakers</p>
            <p>- Improve display on desktop and mobile</p>
            <p>- Improve guitar orientation change</p>
          </Panel>
          <Panel header="Version 1.0.2" key="3">
            <p>- Add option to pick chords on fretboard</p>
            <p>- Add option to play chords in speakers</p>
            <p>- Improve initial load performance</p>
          </Panel>
          <Panel header="Version 1.0.3" key="4">
            <p>- Add option to log in and create account</p>
            <p>- Improve initial load performance</p>
          </Panel>
          <Panel header="Version 2.0.0" key="5">
            <p>- Apply new design</p>
            <p>- Create fretboard visualization game</p>
            <p>- Improve user experience in fretboard visualizer module</p>
            <p>- Add additional visualization of scales and chords</p>
          </Panel>
          <Panel header="Version 2.0.1" key="6">
            <p>- Add 2v2 fretboard visualization game</p>
            <p>- Add perfect pitch game</p>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
};

export { ChangeLog };
