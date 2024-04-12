import { ILogin, ILoginResult } from "@/interfaces/auth";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const LOGIN_URL = "auth/login";

export const login = async (credentials: ILogin): Promise<ILoginResult> => {
  try {
    const response: AxiosResponse<ILoginResult> = await axiosInstance({
      method: "POST",
      url: LOGIN_URL,
      data: credentials,
    });
    const result = response.data;

    return result;
  } catch (error) {
    console.log(error);
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
