import React, {useEffect} from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useUserForm, useUsersFiltering } from "providers";
import { Marker } from "./marker/Marker";
import css from "./Map.module.less";
import { FilteringPanel } from "../filtering-panel/FilteringPanel";
import { MAP_URL } from "modules/musicians-finder/utils";
import { UserData } from "modules/musicians-finder/models";
import { useHistory } from "react-router";

export const Map = () => {
  const history = useHistory();
  const { users } = useUsersFiltering();
  const { data } = useUserForm();
  const defaultProps = {
    center: {
      lat: Number(data.lat ?? 53.77781794425216), //fallback for test
      lng: Number(data.lng ?? 20.474514148698375), //fallback for test
    },
    zoom: 11,
  };

  useEffect(() => {
    const isValidForm: boolean = Object.keys(data).reduce(
      (acc: boolean, curr: string) =>
        acc && Boolean(data[curr as keyof UserData]),
      true
    );
    
    if(!isValidForm) {
      history.push("/form")
    }
  }, [])

  return (
    <div className={css['map-container']}>
      <FilteringPanel />
      <MapContainer
        className={css["leaflet-container"]}
        center={defaultProps.center}
        zoom={12}
      >
        <TileLayer url={MAP_URL} />
        <Marker position={defaultProps.center} type="secondary" user={data} />
        {users.map((u, i) => {
          return (
            <Marker
              key={i}
              position={{ lat: Number(u.lat), lng: Number(u.lng) }}
              type="primary"
              user={u}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};
