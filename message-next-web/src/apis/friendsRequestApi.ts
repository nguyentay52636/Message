import baseApi from "./baseApi";
import type { AxiosError } from "axios";

export const FindUserByPhone = async (phone: string) => {
    try {
      const res = await baseApi.get(`/friendsRequest/search`, {
        params: { keyword: phone },
      });
      return res.data.data; 
  } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>
      throw new Error(axiosError.response?.data?.message || axiosError.message || "Search failed");
    }
  };
  