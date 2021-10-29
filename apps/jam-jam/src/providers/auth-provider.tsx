import axios from "axios";
import React, { createContext, useContext } from "react";

import { LoginData, UserData } from "../modules/musicians-finder/models/index";

interface Props {
    children: React.ReactNode;
}

interface STATE extends LoginData {
    userData: UserData | null;
    isLogged: boolean;
    register: (data: LoginData) => Promise<any>;
    logIn: (data: LoginData) => Promise<any>;
    setUserData: (data: UserData) => void;
}

const defaultState: STATE = {
    userData: null,
    nickname: '',
    password: '',
    email: '',
    isLogged: false,
    register: (data: LoginData) => axios.get(''),
    logIn: (data: LoginData) => axios.get(''),
    setUserData: (data: UserData) => { }
};

const Context = createContext(defaultState);

class AuthProvider extends React.Component<Props, STATE> {
    get isLogged(): boolean {
        return false;
    }

    register(data: LoginData) {
        return axios.post(`${process.env.REACT_APP_URL}api/Account/Register`, {
            username: data.nickname,
            email: data.email,
            password: data.password,
            confirmPassword: data.password
        })
    }

    logIn(data: LoginData) {
        return axios.post(`${process.env.REACT_APP_URL}api/Authentication/Login`, {
            username: data.nickname,
            password: data.password
        })
    }

    setUserData(data: UserData) {
        this.setState({ userData: data })
    }

    state: STATE = {
        ...defaultState,
        isLogged: this.isLogged,
        setUserData: this.setUserData,
        register: this.register,
        logIn: this.logIn
    };

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const useAuth = () => {
    return useContext(Context);
};

export default AuthProvider;
