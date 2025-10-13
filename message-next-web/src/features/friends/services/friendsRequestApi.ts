import baseApi from "./baseApi";

export const FindUserByPhone = async (phone: string) => {
    try {
      const res = await baseApi.get(`/friendsRequest/search`, {
        params: { keyword: phone },
      });
      return res.data.data; 
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Search failed");
    }
  };
  