import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardService } from "../../services/dashboardService";

interface DashboardState {
  stats: {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    orders: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    revenue: 0,
    orders: 0,
  },
  loading: false,
  error: null,
};

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const response = await dashboardService.getStats();
    return response;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch dashboard stats";
      });
  },
});

export default dashboardSlice.reducer;
