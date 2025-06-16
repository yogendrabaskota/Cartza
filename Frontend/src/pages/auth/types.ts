export interface Props {
  type: string;
  onSubmit: (data:UserDataTypes) => void;
}

export interface UserDataTypes {
    email : string,
    username : string,
    password : string
}