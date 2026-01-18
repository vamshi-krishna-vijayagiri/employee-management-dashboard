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
  profileImage: string;
  fullName: string;
  gender: "Male" | "Female";
  dob: string;
  state: string;
  isActive: boolean;
}

const rows: EmployeeRow[] = [
  {
    id: 1001,
    profileImage: "https://i.pravatar.cc/150?img=1",
    fullName: "John Snow",
    gender: "Male",
    dob: "1995-06-15",
    state: "Telangana",
    isActive: true,
  },
  {
    id: 1002,
    profileImage: "https://i.pravatar.cc/150?img=2",
    fullName: "Arya Stark",
    gender: "Female",
    dob: "1998-03-12",
    state: "Karnataka",
    isActive: false,
  },
  {
    id: 1003,
    profileImage: "https://i.pravatar.cc/150?img=3",
    fullName: "Daenerys Targaryen",
    gender: "Female",
    dob: "1993-11-25",
    state: "Tamil Nadu",
    isActive: true,
  },
];

const totalEmployees = rows.length;

const activeEmployees = rows.filter(
  (emp) => emp.isActive
).length;

const inactiveEmployees = rows.filter(
  (emp) => !emp.isActive
).length;

const Dashboard = () => {
    const navigate = useNavigate();

    const handleEdit = (row: EmployeeRow) => {
        console.log("Edit employee:", row);
    };

    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
        console.log("Delete employee with ID:", id);
        }
    };

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4">Dashboard</Typography>
                <PrimaryButton
                    label="Add Employee"
                    onClick={() => navigate("/add-employee")}
                />
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            > 
                <InfoCard
                title={totalEmployees.toString()}
                description="Total Employees"
                />
                <InfoCard
                title={activeEmployees.toString()}
                description="Active Employees"
                />
                <InfoCard
                title={inactiveEmployees.toString()}
                description="Inactive Employees"
                />
            </Box>

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
                    {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>

                        <TableCell>
                        <Avatar src={row.profileImage} />
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
                                onClick={() => handleEdit(row)}
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
