import React, { createContext, useContext } from "react";
import { UserData } from "../modules/musicians-finder/models/index";

interface Props {
  children: React.ReactNode;
}

interface STATE {
  data: UserData;
  setUserData: (data: UserData) => void;
}

const defaultState: STATE = {
  data: {
    nick: "",
    instrument: null,
    exp: null,
    genre: null,
    lat: null,
    lng: null,
  },
  setUserData: () => {},
};

const Context = createContext(defaultState);

class UserFormProvider extends React.Component<Props, STATE> {
  setUserData(data: UserData) {
    this.setState({ data: data });
  }

  state: STATE = {
    ...defaultState,
    setUserData: this.setUserData.bind(this),
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const useUserForm = () => {
  return useContext(Context);
};

export default UserFormProvider;
