import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchViolations = createAsyncThunk(
  "violations/fetchViolations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://172.17.58.151:9000/auth/getViolations"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Error fetching violations data.");
    }
  }
);
const violationSlice = createSlice({
  name: "violations",
  initialState: {
    violations: [],
    searchStore: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    searchState: (state, action) => {
      state.searchStore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchViolations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchViolations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.violations = action.payload;
      })
      .addCase(fetchViolations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { searchState } = violationSlice.actions;
export default violationSlice.reducer;
