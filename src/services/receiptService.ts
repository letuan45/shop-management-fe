import {
  IReceiptBill,
  IReceiptBillFull,
  IReceiptOrder,
  IReceiptOrderFull,
  IReceiptOrderTransfer,
} from "@/interfaces/receipt";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_RECEIPT_ORDER_URL = "receipt/order";
const GET_RECEIPT_BILL_URL = "receipt/bill";
const CREATE_RECEIPT_URL = "receipt/order";
const GET_RECEIPT_ORDER_DETAIL_URL = "receipt/order";
const ADD_ORDER_ITEM_URL = "receipt/order/add-item";
const REMOVE_ORDER_ITEM_URL = "receipt/order/delete-item";
const MINUS_ONE_ORDER_ITEM_URL = "receipt/order/minus-one-qty";
const PLUS_ONE_ORDER_ITEM_URL = "receipt/order/plus-one-qty";
const UPDATE_ORDER_ITEM_URL = "receipt/order/update-qty";
const MAKE_BILL_URL = "receipt/bill/make-bill";
const CANCEL_ORDER_URL = "receipt/order/cancel";
const GET_RECEIPT_BILL_DETAIL_URL = "receipt/bill";

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

interface IGetReceiptOrder {
  signal: AbortSignal;
  orderId: number;
}
export const getReceiptOrder = async ({
  signal,
  orderId,
}: IGetReceiptOrder): Promise<IReceiptOrderFull> => {
  try {
    const response: AxiosResponse<IReceiptOrderFull> = await axiosInstance({
      method: "GET",
      url: GET_RECEIPT_ORDER_DETAIL_URL + "/" + orderId,
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

interface IGetReceiptBill {
  signal: AbortSignal;
  billId: number;
}
export const getReceiptBill = async ({
  signal,
  billId,
}: IGetReceiptBill): Promise<IReceiptBillFull> => {
  try {
    const response: AxiosResponse<IReceiptBillFull> = await axiosInstance({
      method: "GET",
      url: GET_RECEIPT_BILL_DETAIL_URL + "/" + billId,
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

interface IAddOrderItem {
  orderId: number;
  productId: number;
  quantity: number;
}
export const addOrderItem = async ({
  orderId,
  productId,
  quantity,
}: IAddOrderItem): Promise<IReceiptOrderFull> => {
  try {
    const response: AxiosResponse<IReceiptOrderFull> = await axiosInstance({
      method: "POST",
      url: ADD_ORDER_ITEM_URL,
      params: { orderId },
      data: { productId, quantity },
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

interface IRemoveOrderITem {
  orderDetailId: number;
}
export const removeOrderItem = async ({
  orderDetailId,
}: IRemoveOrderITem): Promise<IReceiptOrderFull> => {
  try {
    const response: AxiosResponse<IReceiptOrderFull> = await axiosInstance({
      method: "DELETE",
      url: REMOVE_ORDER_ITEM_URL,
      params: { orderDetailId },
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

export const minusOneDetailQty = async ({
  orderDetailId,
}: IRemoveOrderITem): Promise<IReceiptOrderFull> => {
  try {
    const response: AxiosResponse<IReceiptOrderFull> = await axiosInstance({
      method: "PUT",
      url: MINUS_ONE_ORDER_ITEM_URL,
      params: { orderDetailId },
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

export const plusOneDetailQty = async ({
  orderDetailId,
}: IRemoveOrderITem): Promise<IReceiptOrderFull> => {
  try {
    const response: AxiosResponse<IReceiptOrderFull> = await axiosInstance({
      method: "PUT",
      url: PLUS_ONE_ORDER_ITEM_URL,
      params: { orderDetailId },
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

interface IUpdateQuantity {
  orderDetailId: number;
  quantity: number;
}
export const updateReceiptDetailQty = async ({
  orderDetailId,
  quantity,
}: IUpdateQuantity): Promise<IReceiptOrderFull> => {
  try {
    const response: AxiosResponse<IReceiptOrderFull> = await axiosInstance({
      method: "PUT",
      url: UPDATE_ORDER_ITEM_URL,
      params: { orderDetailId, quantity },
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

export const makeReceiptBill = async ({
  orderId,
}: {
  orderId: number;
}): Promise<IReceiptOrderFull> => {
  try {
    const response: AxiosResponse<IReceiptOrderFull> = await axiosInstance({
      method: "POST",
      url: MAKE_BILL_URL,
      params: { orderId },
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

export const cancelReceiptOrder = async ({
  orderId,
}: {
  orderId: number;
}): Promise<IReceiptOrderFull> => {
  try {
    const response: AxiosResponse<IReceiptOrderFull> = await axiosInstance({
      method: "PUT",
      url: CANCEL_ORDER_URL,
      params: { orderId },
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
