import GoogleMapReact from "google-map-react";
import { useUserForm } from "providers/user-form-provider";
import { SmileOutlined } from "@ant-design/icons";
import css from "./Map.module.less";

interface user {
  id: string;
  lat: number;
  lng: number;
}

export const Map = () => {
  const { data } = useUserForm();
  const defaultProps = {
    center: { lat: Number(data.lat), lng: Number(data.lng) },
    zoom: 11,
  };

  //temporary users database
  const users: user[] = [
    {
      id: "0",
      lat: 53.76463489545775,
      lng: 20.491132794860846,
    },
  ];

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD-beYGw_JbbKcJiM2ZBnxL_UngB0v8F6E" }}
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
        {users.map((e) => (
          <Marker key={e.id} lat={e.lat} lng={e.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

interface MarkerProps {
  lat: number;
  lng: number;
}

const Marker = ({ lat, lng }: MarkerProps) => {
  return (
    <div className={css.pin}>
      <SmileOutlined />
    </div>
  );
};
