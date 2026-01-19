export interface EmployeeFormData {
  fullName: string;
  gender: string;
  dob: string;
  state: string;
  isActive: boolean;
  profileImage?: File | null;
  profileImagePreview?: string;
}
