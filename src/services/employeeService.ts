import { IEmployee } from "@/interfaces/employee";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_EMPLOYEE_URL = "employee";
const CREATE_EMPLOYEE_URL = "employee/create";
const GET_EMPLOYEE_DETAIL_URL = "employee";
const EDIT_EMPLOPYEE_URL = "employee/update";

export const getAllEmployee = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  search?: string | null | undefined;
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
        throw new Error(error.response.data.message);
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

export const getEmployee = async (
  employeeId: number | undefined,
): Promise<IEmployee> => {
  try {
    if (employeeId === undefined) {
      throw new Error(
        "An unexpected error occurred while making the API request",
      );
    }
    const response: AxiosResponse<IEmployee> = await axiosInstance({
      method: "GET",
      url: GET_EMPLOYEE_DETAIL_URL + "/" + employeeId.toString(),
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(error.response.data.message);
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
        throw new Error(error.response.data.message);
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

interface IEditEmployeePayload {
  employeeId: number;
  formData: FormData;
}
export const editEmployee = async (
  payload: IEditEmployeePayload,
): Promise<IEmployee> => {
  try {
    const response: AxiosResponse<IEmployee> = await axiosInstance({
      method: "PUT",
      url: EDIT_EMPLOPYEE_URL + "/" + payload.employeeId,
      data: payload.formData,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(error.response.data.message);
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
