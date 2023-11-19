import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";

export const fetchUsersData = createAsyncThunk("user/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/users`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
    isFetching: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersData.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUsersData.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsersData.rejected, (state, action) => {
      state.isFetching = false;
      state.data = null;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
