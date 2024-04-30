import { axiosInstance } from "@/lib/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

const GET_HOME_STATS_URL = "stats/home";
const GET_HOME_BILL_GRAPH_URL = "stats/home-selling-bill";

interface IHomeStats {
  totalSellingBill: number;
  totalCustomer: number;
  totalProduct: number;
  totalStocks: number;
}
export const getHomeStats = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<IHomeStats> => {
  try {
    const response: AxiosResponse<IHomeStats> = await axiosInstance({
      method: "GET",
      url: GET_HOME_STATS_URL,
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

interface IHomeBillGraph {
  month: string;
  value: number;
}
export const getHomeBillGraph = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<IHomeBillGraph[]> => {
  try {
    const response: AxiosResponse<IHomeBillGraph[]> = await axiosInstance({
      method: "GET",
      url: GET_HOME_BILL_GRAPH_URL,
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
