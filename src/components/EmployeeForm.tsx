import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import InputField from "./InputField";
import { EmployeeFormData } from "../types/employee";

interface EmployeeFormProps {
  initialData?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
}

const states = ["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu"];

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    fullName: "",
    gender: "",
    dob: "",
    state: "",
    isActive: true,
    profileImage: null,
    profileImagePreview: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /** Populate data in Edit mode */
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  /** Input / Radio / Switch */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name!]: type === "checkbox" ? checked : value,
    }));
  };

  /** Select */
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  /** Image Upload */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
      profileImagePreview: URL.createObjectURL(file),
    }));
  };

  /** Validation */
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width={400}>
      <Typography variant="h6">
        {initialData ? "Edit Employee" : "Add Employee"}
      </Typography>

      {/* Full Name */}
      <InputField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        error={!!errors.fullName}
        helperText={errors.fullName}
      />

      {/* Gender */}
      <FormControl error={!!errors.gender}>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>
        <Typography color="error" variant="caption">
          {errors.gender}
        </Typography>
      </FormControl>

      {/* DOB */}
      <InputField
        label="Date of Birth"
        name="dob"
        type="date"
        value={formData.dob}
        onChange={handleInputChange}
        error={!!errors.dob}
        helperText={errors.dob}
      />

      {/* State */}
      <FormControl error={!!errors.state}>
        <FormLabel>State</FormLabel>
        <Select
          name="state"
          value={formData.state}
          onChange={handleSelectChange}
        >
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
        <Typography color="error" variant="caption">
          {errors.state}
        </Typography>
      </FormControl>

      {/* Image Upload */}
      <Button variant="outlined" component="label">
        Upload Profile Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>

      {formData.profileImagePreview && (
        <img
          src={formData.profileImagePreview}
          alt="Preview"
          width={100}
          style={{ borderRadius: 8 }}
        />
      )}

      {/* Active / Inactive */}
      <FormControlLabel
        control={
          <Switch
            checked={formData.isActive}
            onChange={handleInputChange}
            name="isActive"
          />
        }
        label={formData.isActive ? "Active" : "Inactive"}
      />

      <Button variant="contained" onClick={handleSubmit}>
        {initialData ? "Update Employee" : "Add Employee"}
      </Button>
    </Box>
  );
};

export default EmployeeForm;
