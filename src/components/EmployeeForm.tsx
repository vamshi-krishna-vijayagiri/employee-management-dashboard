import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import InputField from "./InputField";
import ProfileAvatar from "./ProfileAvatar";
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

  const [imageError, setImageError] = useState<string>("");
  const [isImageValid, setIsImageValid] = useState(true);

  /** Populate data in Edit mode */
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name!]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: null,
        profileImagePreview: "",
      }));
      setImageError("Image must be less than 100KB");
      setIsImageValid(false);
      return;
    }

    if (file.size > 100 * 1024) {
      setImageError("Image must be less than 100KB");
      setIsImageValid(false);
      setFormData((prev) => ({
        ...prev,
        profileImage: null,
        profileImagePreview: "",
      }));
    } else {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
        profileImagePreview: url,
      }));
      setImageError("");
      setIsImageValid(true);
    }
  };

  const isFormComplete =
    Boolean(formData.fullName) &&
    Boolean(formData.gender) &&
    Boolean(formData.dob) &&
    Boolean(formData.state) &&
    isImageValid;

  const handleSubmit = () => {
    if (!isFormComplete) return;
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Box display="flex" flexDirection="column" gap={2} width={400}>
        <Typography variant="h6" align="center">
          {initialData ? "Edit Employee" : "Add Employee"}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <ProfileAvatar
            photoUrl={formData.profileImagePreview || null}
            onChange={handleImageChange}
          />
          {imageError && (
            <Typography color="error" variant="caption" mt={1}>
              {imageError}
            </Typography>
          )}
        </Box>
        <InputField
          label="Full Name"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <FormControl required>
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
        </FormControl>
        <DatePicker
          label="Date of Birth"
          value={formData.dob ? dayjs(formData.dob) : null}
          onChange={(newValue: Dayjs | null) => {
            setFormData((prev) => ({
              ...prev,
              dob: newValue ? newValue.format("YYYY-MM-DD") : "",
            }));
          }}
          slotProps={{
            textField: {
              required: true,
              fullWidth: true,
            } as any,
          }}
        />
        <FormControl required>
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
        </FormControl>
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
        <Button
          variant="contained"
          fullWidth
          disabled={!isFormComplete}
          onClick={handleSubmit}
        >
          {initialData ? "Update Employee" : "Add Employee"}
        </Button>
      </Box>
    </Paper>
  );
};

export default EmployeeForm;
