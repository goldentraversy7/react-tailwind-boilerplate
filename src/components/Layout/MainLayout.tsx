import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Make sure Sidebar is correctly imported

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "grey.100" }}>
      <CssBaseline />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          p: 3, // Padding around the content
        }}
      >
        {/* Render nested routes */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
