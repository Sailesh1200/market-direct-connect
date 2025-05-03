
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
  date_of_birth: string | null;
  state: string | null;
  district: string | null;
  mobile_number: string | null;
  gender: string | null;
  occupation: string | null;
  created_at: string;
  updated_at: string;
}
