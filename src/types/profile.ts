
export interface ProfileFormData {
  email: string;
  password: string;
  dateOfBirth: string;
  state: string;
  district: string;
  mobileNumber: string;
  gender?: string;
  occupation?: string;
}

export interface Profile {
  id: string;
  dateOfBirth: string | null;
  state: string | null;
  district: string | null;
  mobileNumber: string | null;
  gender: string | null;
  occupation: string | null;
  createdAt: string;
  updatedAt: string;
}
