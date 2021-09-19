import { Button, Collapse, Modal } from "antd";
import React, { useState } from "react";

import css from "./ChangeLog.scss";

const { Panel } = Collapse;

const ChangeLog = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Changelog
      </Button>
      <Modal
        title="What's added ?"
        visible={isModalVisible}
        onOk={handleOk}
        cancelText="Close"
        onCancel={handleCancel}
      >
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
          </Panel>
          <Panel header="Version 1.0.1 - working on" key="2">
            <p>- Add option to pick scale on fretboard</p>
            <p>- Polish language support</p>
            <p>- Improve fretboard scroll on mobiles / desktop</p>
          </Panel>
          <Panel header="Version 1.0.2" key="3">
            <p>- Add option to pick chords on fretboard</p>
            <p>- Add option to play note in speakers</p>
            <p>- Improve initial load performance</p>
          </Panel>
          <Panel header="Version 1.0.3" key="4">
            <p>- Add option to log in and create account</p>
            <p>- Add option to save fretboard state and use it later</p>
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
