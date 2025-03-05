import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"; // Import the custom hooks
import { fetchUsers } from "../../store/slices/userSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function Users() {
  const dispatch = useAppDispatch(); // Use typed dispatch
  const { users, loading, error } = useAppSelector((state) => state.users); // Use typed selector

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
