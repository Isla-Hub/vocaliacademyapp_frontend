import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";

export const loginUser = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchUserData = createAsyncThunk("user/fetchUserData", async (userId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/users/${userId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const putUserData = createAsyncThunk("user/putUserData", async ({ userId, data }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/users/${userId}`, data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    data: null,
    isFetching: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.userId = action.payload.userId;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("ACTION REJECTED", action);
      state.isFetching = false;
      state.userId = null;
      state.error = action.payload;
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isFetching = false;
      state.data = null;
      state.error = action.payload;
    });
    builder.addCase(putUserData.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(putUserData.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(putUserData.rejected, (state, action) => {
      state.isFetching = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
