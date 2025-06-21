export interface Props {
  type: string;
  onSubmit: (data: RegisterUserTypes) => void;
}

export interface RegisterUserTypes {
  email: string;
  username: string;
  password: string;
}

export interface LoginUserTypes {
  email: string;
  password: string;
}
