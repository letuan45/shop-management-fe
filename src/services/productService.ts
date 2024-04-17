import { IProduct } from "@/interfaces/product";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_ALL_PRODUCTS_URL = "product";
const GET_ALL_CATE_URL = "category";
const CREATE_CATE_URL = "category/create";
const CREATE_PRODUCT_URL = "product/create";

interface ICategory {
  id: number;
  name: string;
}

export const getAllProduct = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  search?: string | null | undefined;
}): Promise<{
  data: IProduct[];
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
