import { axiosInstance } from "../lib/axios";
import { LoginCredentials, RegisterCredentials } from "../types/auth";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await axiosInstance.post("/auth/register", credentials);
    return response.data;
  },
};
