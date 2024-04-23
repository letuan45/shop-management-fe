import { ICreateSupplier, ISupplier } from "@/interfaces/supplier";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_ALL_SUPPLIER_URL = "supplier/get-all";
const GET_SUPPLIERS_URL = "supplier";
const CREATE_SUPPLIER_URL = "supplier/create";
const GET_SUPPLIER_DETAIL_URL = "supplier";
const UPDATE_SUPPLIER_URL = "supplier/update";

export const getSuppliers = async (getParams: {
  signal: AbortSignal;
  page?: string | null | undefined;
  search?: string | null | undefined;
  pageSize?: number | null | undefined;
}): Promise<{
  data: ISupplier[];
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
      data: ISupplier[];
      total: number;
    }> = await axiosInstance({
      method: "GET",
      url: GET_SUPPLIERS_URL,
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

export const getAllSupplier = async (getParams: {
  signal: AbortSignal;
}): Promise<ISupplier[]> => {
  try {
    const response: AxiosResponse<ISupplier[]> = await axiosInstance({
      method: "GET",
      url: GET_ALL_SUPPLIER_URL,
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

export const createSupplier = async (
  data: ICreateSupplier,
): Promise<ISupplier> => {
  try {
    const response: AxiosResponse<ISupplier> = await axiosInstance({
      method: "POST",
      url: CREATE_SUPPLIER_URL,
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

export const getSupplier = async ({
  supplierId,
  signal,
}: {
  supplierId: number;
  signal: AbortSignal;
}): Promise<ISupplier> => {
  try {
    const response: AxiosResponse<ISupplier> = await axiosInstance({
      method: "GET",
      url: GET_SUPPLIER_DETAIL_URL + "/" + supplierId,
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

interface IUpdateSupplier {
  supplier: ICreateSupplier;
  supplierId: number;
}
export const updateSupplier = async ({
  supplier,
  supplierId,
}: IUpdateSupplier): Promise<ISupplier> => {
  try {
    const response: AxiosResponse<ISupplier> = await axiosInstance({
      method: "PUT",
      url: UPDATE_SUPPLIER_URL + "/" + supplierId,
      data: supplier,
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
