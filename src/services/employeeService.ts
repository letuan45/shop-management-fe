import { IEmployee } from "@/interfaces/employee";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_EMPLOYEE_URL = "/employee";
const CREATE_EMPLOYEE_URL = "/employee/create";

export const getAllEmployee = async (getParams: {
  signal: AbortSignal;
  page?: number;
  search?: string;
}): Promise<{
  data: IEmployee[];
  total: number;
}> => {
  try {
    let queryParams = {};
    const { page, search } = getParams;
    if (page && search) {
      queryParams = { page, search };
    } else if (page && !search) {
      queryParams = { page };
    } else if (!page && search) {
      queryParams = { search };
    }
    const response: AxiosResponse<{
      data: IEmployee[];
      total: number;
    }> = await axiosInstance({
      method: "GET",
      url: GET_EMPLOYEE_URL,
      params: queryParams,
      signal: getParams.signal,
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

export const createEmployee = async (
  formData: FormData,
): Promise<IEmployee> => {
  try {
    const response: AxiosResponse<IEmployee> = await axiosInstance({
      method: "POST",
      url: CREATE_EMPLOYEE_URL,
      data: formData,
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
