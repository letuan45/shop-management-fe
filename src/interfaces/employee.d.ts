export interface IUser {
  username: string;
  id: number;
  isActive: boolean;
}

export interface IEmployee {
  id: number;
  fullName: number;
  phone: string;
  email: string;
  isWorking: boolean;
  dateOfBirth: string;
  address: string;
  image: string;
  user: IUser;
}
