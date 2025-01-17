import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, Menu } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import logoIcon from "@/assets/images/logo.svg";

export default function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const navigation = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboard /> },
    { name: "Users", href: "/users", icon: <Users /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Sidebar state
  const [isFixed, setIsFixed] = useState(true); // Toggle between fixed and auto mode
  const [isHovered, setIsHovered] = useState(false); // Track hover state for auto mode

  const handleMouseEnter = () => {
    if (!isFixed) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isFixed) setIsHovered(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: isFixed || isHovered ? 240 : 64, // Adjust width based on mode and hover
        transition: "width 0.3s ease-in-out",
        position: "relative",
        backgroundColor: "black", // Sidebar background color
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo and Toggle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isFixed || isHovered ? "space-between" : "center",
          height: 64,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {/* Logo Icon */}
          <Tooltip title="Admin Panel">
            <IconButton
              component={Link}
              to="/" // Navigate to the "/" route
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "grey.400",
                "&:hover": { color: "white" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Box
                component="img"
                src={isFixed || isHovered ? logoIcon : logoIcon} // Use logo icon when collapsed
                alt="Logo"
                sx={{ height: 45 }}
              />
              {isFixed || isHovered ? (
                <Typography
                  variant="h5" // Larger Typography
                  fontWeight="bold" // Make it bold for emphasis
                  sx={{
                    opacity: isFixed || isHovered ? 1 : 0,
                    ml: isFixed || isHovered ? 2 : 0,
                    transition: "opacity 0.3s, transform 0.3s",
                    transform:
                      isFixed || isHovered
                        ? "translateX(0)"
                        : "translateX(-20px)",
                  }}
                >
                  Darling AI
                </Typography>
              ) : null}
            </IconButton>
          </Tooltip>
        </Box>
        {/* Toggle Button */}
        <IconButton
          sx={{
            display: isFixed || isHovered ? "inline-flex" : "none",
            color: "white",
          }}
          onClick={() => setIsFixed(!isFixed)}
        >
          <Menu />
        </IconButton>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, py: 2 }}>
        {navigation.map((item) => (
          <ListItem
            key={item.name}
            component={Link}
            to={item.href}
            sx={{
              borderRadius: 1,
              backgroundColor: isActive(item.href) ? "grey.800" : "inherit",
              color: isActive(item.href) ? "white" : "grey.400",
              "&:hover": {
                backgroundColor: "grey.700",
                color: "white",
              },
              px: 1,
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(item.href) ? "white" : "grey.400",
                minWidth: isFixed || isHovered ? 40 : 24,
                ml: isFixed || isHovered ? 0 : 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              sx={{
                opacity: isFixed || isHovered ? 1 : 0,
                transition: "opacity 0.3s, transform 0.3s",
                transform:
                  isFixed || isHovered ? "translateX(0)" : "translateX(-20px)",
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Sign-Out */}
      {isAuthenticated && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            p: 2,
          }}
        >
          <Tooltip title="Sign Out">
            <IconButton
              onClick={logout}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "grey.400",
                "&:hover": { color: "white" },
                transition: "all 0.3s ease-in-out",
              }}
            >
              <LogOut />
              {isFixed || isHovered ? (
                <Typography
                  sx={{
                    opacity: isFixed || isHovered ? 1 : 0,
                    ml: isFixed || isHovered ? 1 : 0,
                    transition: "opacity 0.3s, transform 0.3s",
                    transform:
                      isFixed || isHovered
                        ? "translateX(0)"
                        : "translateX(-20px)",
                  }}
                >
                  Sign Out
                </Typography>
              ) : null}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
