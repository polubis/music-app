import React from "react";
import css from "./Form.scss";
import { UserData } from "../../models";
import { useUserForm } from "../../../../providers/user-form-provider";
import { useHistory } from "react-router";
import { Button, Select, Radio, Slider, Input } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { MusicGenres, Instruments } from "../../utils/index";

export const Form = () => {
  const { Option } = Select;
  const { data, setUserData } = useUserForm();
  const history = useHistory();

  const onChangeHandler = (value: string | number, key: keyof UserData) => {
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
      console.log("Form is invalid", data); //alert implementation needed
    }
  };

  return (
    <div className={css.form}>
      <h1>User form</h1>
      <Input
        className={css.element}
        placeholder="Nickname"
        onChange={(e) => onChangeHandler(e.target.value, "nick")}
      />
      <div className={css.element}>
        Instrument
        {Instruments.map((key) => (
          <Radio
            key={key}
            onChange={(e) => onChangeHandler(e.target.value, "instrument")}
            value={key}
          >
            {key}
          </Radio>
        ))}
      </div>
      <div className={css.element}>
        Guitar Experience
        <Slider
          min={0}
          max={5}
          defaultValue={0}
          onChange={(e) => onChangeHandler(e, "exp")}
        />
      </div>
      <div className={css.element}>
        Genre
        <Select onChange={(e) => onChangeHandler(`${e}`, "genre")}>
          {MusicGenres.map((key) => (
            <Option key={key} value={key}>
              {key}
            </Option>
          ))}
        </Select>
      </div>
      <div className={css.element}>
        <Button
          type={data.lng && data.lat ? "primary" : "dashed"}
          onClick={onLocationButtonClick}
        >
          <AimOutlined /> Location
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
