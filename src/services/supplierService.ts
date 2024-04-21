import { ISupplier } from "@/interfaces/supplier";
import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_ALL_SUPPLIER_URL = "supplier/get-all";

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
