import {
  IReceiptBill,
  IReceiptOrder,
  IReceiptOrderTransfer,
} from "@/interfaces/receipt";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_RECEIPT_ORDER_URL = "receipt/order";
const GET_RECEIPT_BILL_URL = "receipt/bill";
const CREATE_RECEIPT_URL = "receipt/order";

export const getAllReceiptOrder = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  fromDate?: string | null | undefined;
  toDate?: string | null | undefined;
}): Promise<{
  data: IReceiptOrder[];
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
      data: IReceiptOrder[];
      total: number;
    }> = await axiosInstance({
      method: "GET",
      url: GET_RECEIPT_ORDER_URL,
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

export const getAllReceiptBill = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  fromDate?: string | null | undefined;
  toDate?: string | null | undefined;
}): Promise<{
  data: IReceiptBill[];
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
      data: IReceiptBill[];
      total: number;
    }> = await axiosInstance({
      method: "GET",
      url: GET_RECEIPT_BILL_URL,
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

interface ICreateReceiptOrder {
  receiptOrder: IReceiptOrderTransfer;
}
export const createReceiptOrder = async ({
  receiptOrder,
}: ICreateReceiptOrder): Promise<IReceiptOrder> => {
  try {
    const response: AxiosResponse<IReceiptOrder> = await axiosInstance({
      method: "POST",
      url: CREATE_RECEIPT_URL,
      data: receiptOrder,
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
