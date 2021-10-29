export type LoginData = {
  nickname: string;
  password: string;
  email?: string;
}

export type UserPreferences = {
  instrument: string;
  exp: string;
  genre: string;
};

export type UserData = {
  id: string;
  userDataId: string;
  username: string;
  email: string;
  emailConfirmed: boolean;
  roles: string[];
}