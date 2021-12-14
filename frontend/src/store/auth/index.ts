import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginBody } from "../../api/types";
import userApi from "../../api/user";
import { User } from "../../models/user";
import axios from "axios";

interface AuthState {
  token?: string;
  user?: User;
  loading: boolean;
  initialLoading: boolean;
}

const initialState: AuthState = {
  token: undefined,
  user: undefined,
  loading: false,
  initialLoading: true,
};

const authSliceName = "auth";

const USER_TOKEN = "USER_TOKEN";

const saveTokenInLS = (token: string) => {
  localStorage.setItem(USER_TOKEN, `Bearer ${token}`);
};

const getTokenFromLS = () => {
  return localStorage.getItem(USER_TOKEN);
};

const login = createAsyncThunk(
  `${authSliceName}/login`,
  async (login: LoginBody, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const userWithToken = await userApi.login(login);
      saveTokenInLS(userWithToken.token);
      return userWithToken;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

const activate = createAsyncThunk(
  `${authSliceName}/activate`,
  async (token: string, { dispatch }) => {
    dispatch(startLoading());
    const userWithToken = await userApi.activate(token);
    saveTokenInLS(userWithToken.token);
    return userWithToken;
  }
);

const me = createAsyncThunk(
  `${authSliceName}/me`,
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLS();
    if (!token) {
      return rejectWithValue("No token");
    }
    const userWitkToken = await userApi.me(token);
    return userWitkToken;
  }
);

const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    logout: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const {
        payload: { token, ...user },
      } = action;
      state.token = token;
      state.user = user;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(activate.fulfilled, (state, action) => {
      const {
        payload: { token, ...user },
      } = action;
      state.token = token;
      state.user = user;
      state.loading = false;
    });
    builder.addCase(activate.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      const {
        payload: { token, ...user },
      } = action;
      state.token = token;
      state.user = user;
      state.initialLoading = false;
    });
    builder.addCase(me.rejected, (state) => {
      state.initialLoading = false;
    });
  },
});

export const { startLoading, logout } = authSlice.actions;

export default authSlice.reducer;

export { login, activate, me };
