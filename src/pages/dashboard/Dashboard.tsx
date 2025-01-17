import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  useTheme,
} from "@mui/material";
import { Activity, Users, DollarSign, ShoppingCart } from "lucide-react";

export default function Dashboard() {
  const theme = useTheme();

  const stats = [
    { name: "Total Users", value: "1,234", icon: <Users /> },
    { name: "Revenue", value: "$12,345", icon: <DollarSign /> },
    { name: "Active Users", value: "891", icon: <Activity /> },
    { name: "Orders", value: "456", icon: <ShoppingCart /> },
  ];

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.name}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              {/* Icon */}
              <Avatar
                sx={{
                  bgcolor: theme.palette.grey[100],
                  color: theme.palette.grey[700],
                  width: 48,
                  height: 48,
                  mr: 2,
                }}
              >
                {stat.icon}
              </Avatar>

              {/* Text */}
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                  sx={{ fontWeight: 500 }}
                >
                  {stat.name}
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
