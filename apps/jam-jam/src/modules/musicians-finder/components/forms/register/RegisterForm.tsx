import React, { useState } from "react";
import css from "./Register.module.less";
import { LoginData } from "../../../models";
import { useAuth } from "providers/auth-provider";
import { Button, Input } from "antd";

export const RegisterForm = () => {
  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<LoginData>({
    nickname: '',
    password: '',
    email: '',
  });

  const onChangeHandler = (value: string, key: keyof LoginData) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const onConfirmHandler = async () => {
    const isValidForm: boolean = Object.keys(data).reduce(
      (acc: boolean, curr: string) =>
        acc && Boolean(data[curr as keyof LoginData]),
      true
    );

    if (isValidForm) {
      setIsLoading(true)

      await register(data).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status); //alert implementation needed
        }
      }).finally(() => setIsLoading(false))
    } else {
      console.log("is invalid"); //alert implementation needed
    }
  };

  return (
    <div className={css.form}>
      <div className={css.element}>
        <Input
          placeholder="Nickname"
          onChange={(e) => onChangeHandler(e.target.value, "nickname")}
        />
      </div>
      <div className={css.element}>
        <Input
          className={css.element}
          type="password"
          placeholder="Password"
          onChange={(e) => onChangeHandler(e.target.value, "password")}
        />
      </div>
      <div className={css.element}>
        <Input
          className={css.element}
          placeholder="Email"
          onChange={(e) => onChangeHandler(e.target.value, "email")}
        />
      </div>
      <div className={css.element}>
        <Button disabled={isLoading} type="primary" onClick={onConfirmHandler}>
          Confirm
        </Button>
      </div>
    </div>
  );
};
