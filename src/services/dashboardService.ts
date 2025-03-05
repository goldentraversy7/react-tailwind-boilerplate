import { axiosInstance } from "../lib/axios";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  orders: number;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await axiosInstance.get("/dashboard/stats");
    return response.data;
  },
};
