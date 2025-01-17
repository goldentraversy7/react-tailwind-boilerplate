import { axiosInstance } from "../lib/axios";
import { User } from "../types/auth";

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get("/users");
    return response.data.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },
};
