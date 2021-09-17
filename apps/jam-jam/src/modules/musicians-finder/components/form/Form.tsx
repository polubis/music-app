import React from "react";
import css from "./Form.scss";
import { UserData } from "../../models";
import { useUserForm } from "../../../../providers/user-form-provider";
import { useHistory } from "react-router";
import { Button, Select, Radio, Slider, Input } from "antd";

export const Form = () => {
  const { Option } = Select;

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
      <Input
        className={css.element}
        placeholder="Nickname"
        onChange={(e) => onChangeHandler(e.target.value, "nick")}
      />
      <div className={css.element}>
        Instrument
        <Radio
          value="guitar"
          onChange={(e) => onChangeHandler(e.target.value, "instrument")}
        >
          Guitar
        </Radio>
      </div>
      <div className={css.element}>
        Guitar Expirience
        <Slider
          range
          min={1}
          max={5}
          onChange={(e) => onChangeHandler(`${e[1]}`, "exp")}
        />
      </div>
      <div className={css.element}>
        Genre
        <Select onChange={(e) => console.log(e)}>
          <Option value="rock">Rock</Option>
          <Option value="blues">Blues</Option>
        </Select>
      </div>
      <div className={css.element}>
        <Button type="primary" onClick={onLocationButtonClick}>
          Location
        </Button>
      </div>
      <div className={css.element}>
        <Button type="primary" onClick={onConfirmHandler}>
          Confirm
        </Button>
      </div>
    </div>
  );
};
