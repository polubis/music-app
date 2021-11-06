import React, { useState } from "react";
import css from "./Login.module.less";
import { LoginData, UserData } from "../../../models";
import { useAuth } from "providers/auth-provider";
import { Button, Input } from "antd";

export const LoginForm = () => {
    const { logIn, setUserData, userData } = useAuth();
    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState<LoginData>({
        nickname: '',
        password: '',
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

            await logIn(data).then((res) => {
                const data: UserData = res.data.data;
                console.log(data)
                setUserData(data)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                }
            }).finally(() => setIsLoading(false))
        } else {
            console.log(data);
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
                <Button type="primary" disabled={isLoading} onClick={onConfirmHandler}>
                    Confirm
                </Button>
            </div>
        </div>
    );
};
