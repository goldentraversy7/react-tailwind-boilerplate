import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // Import the custom theme
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { store } from "./store/store";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Users from "./pages/users";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const rehydrate = useAuthStore((state) => state.rehydrate);

  useEffect(() => {
    rehydrate(); // Restore authentication state on app load
  }, [rehydrate]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline /> {/* Provides consistent styling for the entire app */}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} /> {/* Child route */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
