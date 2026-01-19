import { EmployeeFormData } from "../types/employee";

const STORAGE_KEY = "employees";

export interface StoredEmployee extends EmployeeFormData {
  id: number;
}

export const getEmployees = (): StoredEmployee[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const saveEmployees = (employees: StoredEmployee[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};
