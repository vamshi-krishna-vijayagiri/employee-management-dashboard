import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Switch,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import PrimaryButton from "../components/PrimaryButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EmployeeRow {
  id: number;
  profileImagePreview?: string;
  fullName: string;
  gender: "Male" | "Female";
  dob: string;
  state: string;
  isActive: boolean;
}

const STORAGE_KEY = "employees";

const Dashboard = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<EmployeeRow[]>([]);

  /** Load employees */
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
    setRows(stored);
  }, []);

  /** Delete employee */
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    const updated = rows.filter((emp) => emp.id !== id);
    setRows(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const totalEmployees = rows.length;
  const activeEmployees = rows.filter((e) => e.isActive).length;
  const inactiveEmployees = rows.filter((e) => !e.isActive).length;

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Dashboard</Typography>
        <PrimaryButton
          label="Add Employee"
          onClick={() => navigate("/employee/add")}
        />
      </Box>

      {/* Info Cards */}
      <Box display="flex" gap={2} mb={3}>
        <InfoCard title={totalEmployees.toString()} description="Total Employees" />
        <InfoCard title={activeEmployees.toString()} description="Active Employees" />
        <InfoCard title={inactiveEmployees.toString()} description="Inactive Employees" />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No employees found
                </TableCell>
              </TableRow>
            )}

            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>

                <TableCell>
                  <Avatar src={row.profileImagePreview} />
                </TableCell>

                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.dob}</TableCell>
                <TableCell>{row.state}</TableCell>

                <TableCell>
                  <Switch
                    checked={row.isActive}
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/employee/edit/${row.id}`)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
