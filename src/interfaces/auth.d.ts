export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  username: string;
  isActive: boolean;
  roleId: number;
  employeeId: number;
  cartItems: [];
  cartId: number;
  fullName: string;
  email: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface IJWTTokenPayload {
  cartId: number;
  cartItems: [];
  email: string;
  employeeId: number;
  exp: number;
  fullName: string;
  iat: number;
  id: number;
  image: string;
  isActive: boolean;
  roleId: number;
  username: string;
}

export interface IRole {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  username: string;
  isActive: boolean;
  employeeId: number;
  role: IRole;
}
