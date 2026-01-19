import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { EmployeeFormData } from "../types/employee";

const STORAGE_KEY = "employees";

interface StoredEmployee extends EmployeeFormData {
  id: number;
}

const EmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  // Get employees from localStorage
  const employees: StoredEmployee[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  // Find employee for edit
  const employeeToEdit = isEditMode
    ? employees.find((e) => e.id === Number(id))
    : undefined;

  const handleSubmit = (data: EmployeeFormData) => {
    let updatedEmployees: StoredEmployee[];

    if (isEditMode && employeeToEdit) {
      // UPDATE
      updatedEmployees = employees.map((emp) =>
        emp.id === employeeToEdit.id ? { ...emp, ...data } : emp
      );
    } else {
      // ADD
      const newEmployee: StoredEmployee = {
        id: Date.now(),
        ...data,
      };
      updatedEmployees = [...employees, newEmployee];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEmployees));
    navigate("/dashboard");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <EmployeeForm
        initialData={isEditMode ? employeeToEdit : undefined}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default EmployeePage;
