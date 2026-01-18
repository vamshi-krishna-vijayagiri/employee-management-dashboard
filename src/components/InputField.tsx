import React from "react";
import TextField from "@mui/material/TextField";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  placeholder?: string;
  fullWidth?: boolean;
  variant?: "outlined" | "filled" | "standard";
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  fullWidth = true,
  variant = "outlined",
  error = false,
  helperText,
  disabled = false,
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      placeholder={placeholder}
      fullWidth={fullWidth}
      variant={variant}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
};

export default InputField;
