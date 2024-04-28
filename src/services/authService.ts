import { ILogin, ILoginResult, IRole, IUser } from "@/interfaces/auth";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const LOGIN_URL = "auth/login";
const LOGOUT_URL = "auth/logout";
const GET_USER_URL = "user";
const GET_ROLE_URL = "user/roles";
const REGISTER_URL = "user/register";
const UPDATE_USER_URL = "user/update";

export const login = async (credentials: ILogin): Promise<ILoginResult> => {
  try {
    const response: AxiosResponse<ILoginResult> = await axiosInstance({
      method: "POST",
      url: LOGIN_URL,
      data: credentials,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `API request failed with status ${error.response.status}`,
        );
      } else {
        throw new Error("API request failed: request could not be sent");
      }
    } else {
      throw new Error(
        "An unexpected error occurred while making the API request",
      );
    }
  }
};

export const logout = async (userId: number) => {
  try {
    if (userId === 0) {
      throw new Error("User id is not a valid!");
    }
    const response = await axiosInstance({
      method: "POST",
      url: LOGOUT_URL,
      params: { userId },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `API request failed with status ${error.response.status}`,
        );
      } else {
        throw new Error("API request failed: request could not be sent");
      }
    } else {
      throw new Error(
        "An unexpected error occurred while making the API request",
      );
    }
  }
};

export const getAccount = async ({
  userId,
}: {
  userId: number;
}): Promise<IUser> => {
  try {
    const response: AxiosResponse<IUser> = await axiosInstance({
      method: "GET",
      url: GET_USER_URL + "/" + userId,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `API request failed with status ${error.response.status}`,
        );
      } else {
        throw new Error("API request failed: request could not be sent");
      }
    } else {
      throw new Error(
        "An unexpected error occurred while making the API request",
      );
    }
  }
};

export const getAllRoles = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<IRole[]> => {
  try {
    const response: AxiosResponse<IRole[]> = await axiosInstance({
      method: "GET",
      url: GET_ROLE_URL,
      signal,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `API request failed with status ${error.response.status}`,
        );
      } else {
        throw new Error("API request failed: request could not be sent");
      }
    } else {
      throw new Error(
        "An unexpected error occurred while making the API request",
      );
    }
  }
};

interface IRegister {
  employeeId: number;
  roleId: number;
  username: string;
  password: string;
}
export const register = async ({
  employeeId,
  roleId,
  username,
  password,
}: IRegister): Promise<IUser> => {
  try {
    const response: AxiosResponse<IUser> = await axiosInstance({
      method: "POST",
      url: REGISTER_URL,
      params: { employeeId, roleId },
      data: { username, password },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `API request failed with status ${error.response.status}`,
        );
      } else {
        throw new Error("API request failed: request could not be sent");
      }
    } else {
      throw new Error(
        "An unexpected error occurred while making the API request",
      );
    }
  }
};

interface IUpdateUser {
  userId: number;
  password: string;
  roleId: number;
  isActive: boolean;
  isUpdatePwd: boolean;
}
export const updateUser = async ({
  userId,
  password,
  roleId,
  isActive,
  isUpdatePwd,
}: IUpdateUser): Promise<IUser> => {
  try {
    const response: AxiosResponse<IUser> = await axiosInstance({
      method: "PUT",
      url: UPDATE_USER_URL,
      params: { userId },
      data: { password, roleId, isActive, isUpdatePwd },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `API request failed with status ${error.response.status}`,
        );
      } else {
        throw new Error("API request failed: request could not be sent");
      }
    } else {
      throw new Error(
        "An unexpected error occurred while making the API request",
      );
    }
  }
};
