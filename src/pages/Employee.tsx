import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { EmployeeFormData } from "../types/employee";
import { getEmployees, saveEmployees, StoredEmployee } from "../utils/employeeStorage";

const EmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const employees = getEmployees();

  const employeeToEdit = isEditMode
    ? employees.find((e) => e.id === Number(id))
    : undefined;

  const handleSubmit = (data: EmployeeFormData) => {
    let updatedEmployees: StoredEmployee[];

    if (isEditMode && employeeToEdit) {
      updatedEmployees = employees.map((emp) =>
        emp.id === employeeToEdit.id ? { ...emp, ...data } : emp
      );
    } else {
      const newEmployee: StoredEmployee = {
        id: Date.now(),
        ...data,
      };
      updatedEmployees = [...employees, newEmployee];
    }

    saveEmployees(updatedEmployees);
    navigate("/dashboard");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <EmployeeForm
        initialData={isEditMode ? employeeToEdit : undefined}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default EmployeePage;
