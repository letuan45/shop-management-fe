import { IAddToCart, ICart, ICartItem } from "@/interfaces/cart";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_CART_URL = "cart";
const ADD_TO_CART_URL = "cart/add-to-cart";
const PLUS_ONE_URL = "cart/plus-one";
const MINUS_ONE_URL = "cart/minus-one";
const UPDATE_CART_QTY = "cart/update-quantity";
const REMOVE_CART_ITEM_URL = "cart";

export const getCart = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<ICart> => {
  try {
    const response: AxiosResponse<ICart> = await axiosInstance({
      method: "GET",
      url: GET_CART_URL,
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

export const addToCart = async ({
  productId,
  quantity,
}: IAddToCart): Promise<ICartItem> => {
  try {
    const response: AxiosResponse<ICartItem> = await axiosInstance({
      method: "POST",
      url: ADD_TO_CART_URL,
      params: { productId, quantity },
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

export const plusCartByOne = async ({
  productId,
}: {
  productId: number;
}): Promise<ICartItem> => {
  try {
    const response: AxiosResponse<ICartItem> = await axiosInstance({
      method: "PUT",
      url: PLUS_ONE_URL,
      params: { productId },
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

export const minusCartByOne = async ({
  productId,
}: {
  productId: number;
}): Promise<ICartItem> => {
  try {
    const response: AxiosResponse<ICartItem> = await axiosInstance({
      method: "PUT",
      url: MINUS_ONE_URL,
      params: { productId },
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

export const updateCartQuantity = async ({
  productId,
  quantity,
}: IAddToCart): Promise<ICartItem> => {
  try {
    const response: AxiosResponse<ICartItem> = await axiosInstance({
      method: "PUT",
      url: UPDATE_CART_QTY,
      params: { productId, quantity },
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

export const removeCartItem = async ({
  cartItemId,
}: {
  cartItemId: number;
}): Promise<ICartItem> => {
  try {
    const response: AxiosResponse<ICartItem> = await axiosInstance({
      method: "DELETE",
      url: REMOVE_CART_ITEM_URL + "/" + cartItemId,
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
