import React, { useState } from "react";
import { Marker as MapMarker } from "react-leaflet";
import { divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { EnvironmentFilled, UserOutlined } from "@ant-design/icons";
import { Modal, Row, Col } from "antd";
import css from "./Marker.module.less";
import { UserData } from "modules/musicians-finder/models";

interface MarkerProps {
  position: { lat: number; lng: number };
  type: "primary" | "secondary";
  user: UserData;
}

export const Marker = ({ position, type, user }: MarkerProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const styles = {
    primary: css.primary,
    secondary: css.secondary,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const userMarker = divIcon({
    html: ReactDOMServer.renderToString(<EnvironmentFilled />),
    className: `${styles[type]} ${css.marker}`,
  });

  return (
    <>
      <MapMarker
        eventHandlers={{ click: showModal }}
        position={position}
        icon={userMarker}
      />
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        cancelText="Close"
        onCancel={handleCancel}
      >
        <div className={css.modal}>
          <Row>
            <Col className={css.column1} span={12}>
              <UserOutlined className={css.userIcon} />
            </Col>
            <Col className={css.column2} span={12}>
              <Row gutter={16}>
                <Col span={12} className={css.alignRight}>
                  <p>Nick</p>
                  <p>Instrument</p>
                  <p>Experience</p>
                  <p>Genre</p>
                </Col>
                <Col span={12}>
                  <p>{user.nick}</p>
                  <p>{user.instrument}</p>
                  <p>{user.exp}</p>
                  <p>{user.genre}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};
