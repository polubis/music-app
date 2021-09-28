import React from "react";
import { Marker as MapMarker } from "react-leaflet";
import { divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { EnvironmentFilled, UserOutlined } from "@ant-design/icons";
import { Modal, Row, Col } from "antd";
import { UserData } from "modules/musicians-finder/models";
import { useToggle } from "dk";
import css from "./Marker.module.less";
interface MarkerProps {
  position: { lat: number; lng: number };
  type: "primary" | "secondary";
  user: UserData;
}

export const Marker = ({ position, type, user }: MarkerProps) => {
  const [isOpen, { open, close }] = useToggle();
  const styles = {
    primary: css.primary,
    secondary: css.secondary,
  };

  const userMarker = divIcon({
    html: ReactDOMServer.renderToString(<EnvironmentFilled />),
    className: `${styles[type]} ${css.marker}`,
  });

  return (
    <>
      <MapMarker
        eventHandlers={{ click: open }}
        position={position}
        icon={userMarker}
      />
      <Modal
        visible={isOpen}
        onOk={close}
        cancelText="Close"
        onCancel={close}
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
