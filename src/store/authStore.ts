import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";
import { axiosInstance } from "../lib/axios";
import { jwtDecode } from "jwt-decode";

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  rehydrate: () => void; // Added function to restore state on reload
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          const response = await axiosInstance.post("/auth/login", credentials);
          const { token } = response.data; // Extract the token from the response
          const decoded = jwtDecode<{ email: string; name: string }>(token); // Decode to get name and email
          const user = {
            email: decoded.email,
            name: decoded.name,
          };
          set({ user, token, isAuthenticated: true }); // Update the store state
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },

      register: async (credentials) => {
        try {
          const response = await axiosInstance.post(
            "/auth/register",
            credentials
          );
          if (response.status === 201) {
            console.log("User registered successfully:", response.data.message);
          }
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      rehydrate: () => {
        const token = get().token;
        if (token) {
          try {
            const decoded = jwtDecode<{ email: string; name: string }>(token);
            const user = {
              email: decoded.email,
              name: decoded.name,
            };
            set({ user, isAuthenticated: true }); // Restore state from token
          } catch (error) {
            console.error("Token rehydration failed:", error);
          }
        }
      },
    }),
    {
      name: "auth-storage", // Name of the localStorage key
      getStorage: () => localStorage, // Use localStorage
      skipHydration: false, // Ensure hydration occurs
    }
  )
);
