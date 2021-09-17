import React from "react";
import { UserData } from "../../models";
import css from "./Form.scss";
import { useUserForm } from "../../../../providers/user-form-provider";
import { useHistory } from "react-router";

export const Form = () => {
  const { data, setUserData } = useUserForm();
  const history = useHistory();

  const onChangeHandler = (value: string, key: keyof UserData) => {
    setUserData({
      ...data,
      [key]: value,
    });
  };

  const onLocationButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserData({
          ...data,
          lat: `${position.coords.latitude}`,
          lng: `${position.coords.longitude}`,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser."); //alert implementation needed
    }
  };

  const onConfirmHandler = () => {
    const isValidForm: boolean = Object.keys(data).reduce(
      (acc: boolean, curr: string) =>
        acc && Boolean(data[curr as keyof UserData]),
      true
    );

    if (isValidForm) {
      history.push("/map");
    } else {
      console.log("is invalid"); //alert implementation needed
    }
  };

  return (
    <div className={css.form}>
      <form>
        <label>
          Nickname
          <input
            type="text"
            onChange={(e) => onChangeHandler(e.target.value, "nick")}
          />
        </label>
        <label>
          <label>
            Instrument
            <>
              <input
                type="radio"
                name="guitar"
                value="guitar"
                onChange={(e) => onChangeHandler(e.target.value, "instrument")}
              />
              Guitar
            </>
          </label>
        </label>
        <label>
          Expirience
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            onChange={(e) => onChangeHandler(e.target.value, "exp")}
          />
        </label>
        <label>
          Genre
          <select onChange={(e) => onChangeHandler(e.target.value, "genre")}>
            <option value=""></option>
            <option value="rock">Rock</option>
            <option value="blues">Blues</option>
          </select>
        </label>
      </form>
      <button onClick={onLocationButtonClick}>x</button>
      <button onClick={onConfirmHandler}>Confirm</button>
      <div>{data.nick}</div>
      <div>{data.instrument}</div>
      <div>{data.exp}</div>
      <div>{data.genre}</div>
      <div>{data.lat}</div>
      <div>{data.lng}</div>
    </div>
  );
};
