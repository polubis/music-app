import React, { createContext, useContext } from "react";
import { UserData } from "../modules/musicians-finder/models/index";
import { temporaryUsers } from "modules/musicians-finder/utils";

interface Props {
  children: React.ReactNode;
}

interface STATE {
  users: UserData[]
  setUsers: (data: UserData[]) => void;
}

const defaultState: STATE = {
  users: temporaryUsers,
  setUsers: () => { },
};

const Context = createContext(defaultState);

class UsersFilteringProvider extends React.Component<Props, STATE> {
  setUsers(users: UserData[]) {
    this.setState({ users: users });
  }

  state: STATE = {
    ...defaultState,
    setUsers: this.setUsers.bind(this),
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const useUsersFiltering = () => {
  return useContext(Context);
};

export default UsersFilteringProvider;
