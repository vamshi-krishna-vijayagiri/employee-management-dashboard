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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import PrimaryButton from "../components/PrimaryButton";
import ConfirmDialog from "../components/ConfirmDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputField from "../components/InputField";

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
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [genderFilter, setGenderFilter] = useState<"all" | "Male" | "Female">("all");

  /** Confirm dialog state */
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  /** Load employees */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setRows(stored);
  }, []);

  /** Open confirm dialog */
  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  /** Confirm delete */
  const handleConfirmDelete = () => {
    if (selectedId === null) return;

    const updated = rows.filter((emp) => emp.id !== selectedId);
    setRows(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setOpenDialog(false);
    setSelectedId(null);
  };

  /** Cancel delete */
  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const filteredRows = rows.filter((row) => {
    const matchesName = row.fullName
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && row.isActive) ||
      (statusFilter === "inactive" && !row.isActive);

    const matchesGender =
      genderFilter === "all" || row.gender === genderFilter;  

    return matchesName && matchesStatus && matchesGender;
  });

  const totalEmployees = rows.length;
  const activeEmployees = rows.filter((e) => e.isActive).length;
  const inactiveEmployees = rows.filter((e) => !e.isActive).length;

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Dashboard</Typography>
        <PrimaryButton
          label="Add Employee"
          onClick={() => navigate("/employee/add")}
        />
      </Box>

      {/* Cards + Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={3}>
        <Box display="flex" gap={2}>
          <InfoCard count={totalEmployees.toString()} title="Total Employees" />
          <InfoCard count={activeEmployees.toString()} title="Active Employees" />
          <InfoCard count={inactiveEmployees.toString()} title="Inactive Employees" />
        </Box>

        <Box display="flex" gap={2} alignItems="flex-end">
          <InputField
            label="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            fullWidth={false}
            size="small"
          />

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              value={genderFilter}
              onChange={(e) =>
                setGenderFilter(e.target.value as "all" | "Male" | "Female")
              }
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "all" | "active" | "inactive"
                )
              }
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No employees found
                </TableCell>
              </TableRow>
            )}

            {filteredRows.map((row) => (
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
                  <Switch checked={row.isActive} />
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
                    onClick={() => handleDeleteClick(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={openDialog}
        title="Delete Employee"
        description="Are you sure you want to delete this employee?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
};

export default Dashboard;
