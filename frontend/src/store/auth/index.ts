import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";

interface AuthState {
  token?: string;
  user?: User;
  errorMessage?: string;
  loading: boolean;
}

const initialState: AuthState = {
  token: undefined,
  user: undefined,
  errorMessage: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
