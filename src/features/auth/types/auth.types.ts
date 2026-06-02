/** Authenticated user profile returned by the API */
export interface User {
  id: string;
  userId: string;
  name: string;
  role: string;
  subrole: string;
  phone: string;
  joiningDate: string;
  endDate: string;
  lastActive: string;
  payment: boolean;
}

/** Shape of the login API success response */
export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

/** Generic API error shape returned by the backend */
export interface ApiError {
  status: string;
  message: string;
}