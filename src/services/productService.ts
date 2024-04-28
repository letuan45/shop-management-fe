import { IProduct } from "@/interfaces/product";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_ALL_PRODUCTS_URL = "product";
const GET_ALL_CATE_URL = "category";
const CREATE_CATE_URL = "category/create";
const CREATE_PRODUCT_URL = "product/create";
const GET_PRODUCT_URL = "product";
const EDIT_PRODUCT_URL = "product/update";
const EDIT_CATE_URL = "category/update";

interface ICategory {
  id: number;
  name: string;
}

export const getAllProduct = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  search?: string | null | undefined;
  pageSize?: number | null | undefined;
  isForSell?: boolean | null | undefined;
}): Promise<{
  data: IProduct[];
  total: number;
}> => {
  try {
    let queryParams = {};
    const { page, search, pageSize, isForSell } = getParams;
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

    if (isForSell === true) {
      queryParams = { ...queryParams, isForSell };
    }

    const response: AxiosResponse<{
      data: IProduct[];
      total: number;
    }> = await axiosInstance({
      method: "GET",
      url: GET_ALL_PRODUCTS_URL,
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

export const createProduct = async (formData: FormData): Promise<IProduct> => {
  try {
    const response: AxiosResponse<IProduct> = await axiosInstance({
      method: "POST",
      url: CREATE_PRODUCT_URL,
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

export const getAllCategory = async (getParams: {
  signal: AbortSignal;
}): Promise<ICategory[]> => {
  try {
    const response: AxiosResponse<ICategory[]> = await axiosInstance({
      method: "GET",
      url: GET_ALL_CATE_URL,
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

export const createCategory = async ({
  name,
}: {
  name: string | undefined;
}): Promise<ICategory> => {
  try {
    if (name === undefined) {
      throw new Error("Dữ liệu không hợp lệ!");
    }
    const response: AxiosResponse<ICategory> = await axiosInstance({
      method: "POST",
      url: CREATE_CATE_URL,
      data: { name },
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

export const getProduct = async ({
  signal,
  productId,
}: {
  signal: AbortSignal;
  productId: number;
}): Promise<IProduct> => {
  try {
    if (productId === undefined) {
      throw new Error(
        "An unexpected error occurred while making the API request",
      );
    }
    const response: AxiosResponse<IProduct> = await axiosInstance({
      method: "GET",
      url: GET_PRODUCT_URL + "/" + productId.toString(),
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

interface IEditProductPayload {
  productId: number;
  formData: FormData;
}
export const editProduct = async (
  payload: IEditProductPayload,
): Promise<IProduct> => {
  try {
    const response: AxiosResponse<IProduct> = await axiosInstance({
      method: "PUT",
      url: EDIT_PRODUCT_URL + "/" + payload.productId,
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

export const editCategory = async ({
  cateId,
  cateName,
}: {
  cateId: number;
  cateName: string;
}): Promise<ICategory> => {
  try {
    const response: AxiosResponse<ICategory> = await axiosInstance({
      method: "PUT",
      url: EDIT_CATE_URL + "/" + cateId,
      data: { name: cateName },
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
