import { ICreateCustomer, ICustomer } from "@/interfaces/customer";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_CUSTOMERS_URL = "customer";
const CREATE_CUSTOIMER_URL = "customer/create";
const GET_CUSTOMER_URL = "customer";
const UPDATE_CUSTOMER_URL = "customer";

export const getCustomers = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  search?: string | null | undefined;
  pageSize?: number | null | undefined;
}): Promise<{
  data: ICustomer[];
  total: number;
}> => {
  try {
    let queryParams = {};
    const { page, search, pageSize } = getParams;
    if (page && search) {
      queryParams = { page, search };
    } else if (page && !search) {
      queryParams = { page };
    } else if (!page && search) {
      queryParams = { search };
    }

    if (pageSize) {
      queryParams = { ...queryParams, pageSize };
    }

    const response: AxiosResponse<{
      data: ICustomer[];
      total: number;
    }> = await axiosInstance({
      method: "GET",
      url: GET_CUSTOMERS_URL,
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

export const createCustomer = async (
  data: ICreateCustomer,
): Promise<ICustomer> => {
  try {
    const response: AxiosResponse<ICustomer> = await axiosInstance({
      method: "POST",
      url: CREATE_CUSTOIMER_URL,
      data,
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

export const getCustomer = async ({
  customerId,
  signal,
}: {
  customerId: number;
  signal: AbortSignal;
}): Promise<ICustomer> => {
  try {
    const response: AxiosResponse<ICustomer> = await axiosInstance({
      method: "GET",
      url: GET_CUSTOMER_URL + "/" + customerId,
      signal,
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

interface IUpdateCustomer {
  customer: ICreateCustomer;
  customerId: number;
}
export const updateCustomer = async ({
  customer,
  customerId,
}: IUpdateCustomer): Promise<ICustomer> => {
  try {
    const response: AxiosResponse<ICustomer> = await axiosInstance({
      method: "PUT",
      url: UPDATE_CUSTOMER_URL + "/" + customerId,
      data: customer,
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
