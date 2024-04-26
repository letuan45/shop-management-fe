import { ISellingBill, ISellingBillFull } from "./../interfaces/selling.d";
import { ISellingOrder, ISellingOrderFull } from "@/interfaces/selling";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosResponse, AxiosError } from "axios";

const GET_SELLING_ORDERS_URL = "selling/order";
const CREATE_SELLING_ORDER_URL = "selling/order/create";
const GET_SELLING_ORDER_URL = "selling/order";
const PLUS_ONE_ORDER_QTY = "selling/order/plus-one-qty";
const MINUS_ONE_ORDER_QTY = "selling/order/minus-one-qty";
const UPDATE_ORDER_QTY = "selling/order/update-qty";
const DELETE_ORDER_ITEM = "selling/order/delete-item";
const ADD_ORDER_ITEM = "selling/order/add-item";
const CHANGE_CUSTOMER_URL = "selling/order/change-customer";
const GET_SELLING_BILL_URL = "selling/bill";
const MAKE_BILL_URL = "selling/bill/make-bill";
const CANCEL_ORDER_URL = "selling/order/cancel";

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

export const getAllSellingBill = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  fromDate?: string | null | undefined;
  toDate?: string | null | undefined;
}): Promise<{
  data: ISellingBill[];
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
      data: ISellingBill[];
      total: number;
    }> = await axiosInstance({
      method: "GET",
      url: GET_SELLING_BILL_URL,
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

export const getSellingBill = async ({
  signal,
  billId,
}: {
  signal: AbortSignal;
  billId: number;
}): Promise<ISellingBillFull> => {
  try {
    const response: AxiosResponse<ISellingBillFull> = await axiosInstance({
      method: "GET",
      url: GET_SELLING_BILL_URL + "/" + billId,
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

interface IAddOrderItem {
  orderId: number;
  productId: number;
  quantity: number;
}
export const addOrderItem = async ({
  orderId,
  productId,
  quantity,
}: IAddOrderItem): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "POST",
      url: ADD_ORDER_ITEM + "/",
      params: { orderId },
      data: { productId, quantity },
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

export const plusOneQtySellingOrder = async ({
  orderDetailId,
}: {
  orderDetailId: number;
}): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "PUT",
      url: PLUS_ONE_ORDER_QTY,
      params: { orderDetailId },
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

export const minusOneQtySellingOrder = async ({
  orderDetailId,
}: {
  orderDetailId: number;
}): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "PUT",
      url: MINUS_ONE_ORDER_QTY,
      params: { orderDetailId },
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

export const updateQtySellingOrder = async ({
  orderDetailId,
  quantity,
}: {
  orderDetailId: number;
  quantity: number;
}): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "PUT",
      url: UPDATE_ORDER_QTY,
      params: { orderDetailId, quantity },
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

export const removeOrderItem = async ({
  orderDetailId,
}: {
  orderDetailId: number;
}): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "DELETE",
      url: DELETE_ORDER_ITEM,
      params: { orderDetailId },
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

export const changeCustomer = async ({
  orderId,
  customerId,
}: {
  orderId: number;
  customerId: number;
}): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "PUT",
      url: CHANGE_CUSTOMER_URL,
      params: { orderId, customerId },
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

export const makeBill = async ({
  orderId,
  customerPayment,
}: {
  orderId: number;
  customerPayment: number;
}): Promise<ISellingBillFull> => {
  try {
    const response: AxiosResponse<ISellingBillFull> = await axiosInstance({
      method: "POST",
      url: MAKE_BILL_URL,
      params: { orderId, customerPayment },
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

export const cancelSellingOrder = async ({
  orderId,
}: {
  orderId: number;
}): Promise<ISellingOrderFull> => {
  try {
    const response: AxiosResponse<ISellingOrderFull> = await axiosInstance({
      method: "PUT",
      url: CANCEL_ORDER_URL,
      params: { orderId },
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
