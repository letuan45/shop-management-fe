import { ISellingOrder, ISellingOrderFull } from "@/interfaces/selling";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosResponse, AxiosError } from "axios";

const GET_SELLING_ORDERS_URL = "selling/order";
const CREATE_SELLING_ORDER_URL = "selling/order/create";
const GET_SELLING_ORDER_URL = "selling/order";

export const getAllSellingOrder = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  fromDate?: string | null | undefined;
  toDate?: string | null | undefined;
}): Promise<{
  data: ISellingOrder[];
  total: number;
}> => {
  try {
    const queryParams: { [key: string]: string | undefined } = {};

    if (getParams.page !== null && getParams.page !== undefined) {
      queryParams.page = getParams.page;
    }
    if (
      getParams.fromDate !== null &&
      getParams.fromDate !== undefined &&
      getParams.fromDate !== ""
    ) {
      queryParams.fromDate = getParams.fromDate;
    }
    if (
      getParams.toDate !== null &&
      getParams.toDate !== undefined &&
      getParams.toDate !== ""
    ) {
      queryParams.toDate = getParams.toDate;
    }

    const response: AxiosResponse<{
      data: ISellingOrder[];
      total: number;
    }> = await axiosInstance({
      method: "GET",
      url: GET_SELLING_ORDERS_URL,
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

export const createSellingOrder = async ({
  customerId,
}: {
  customerId: number;
}): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "POST",
      url: CREATE_SELLING_ORDER_URL,
      params: customerId > 0 ? { customerId } : {},
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

export const getSellingOrder = async ({
  signal,
  orderId,
}: {
  orderId: number;
  signal: AbortSignal;
}): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "GET",
      url: GET_SELLING_ORDER_URL + "/" + orderId,
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
