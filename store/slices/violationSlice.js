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
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (searchStore, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://studentmobileapi.gitam.edu/Logingym",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserName: searchStore,
            Password: "Ganesh@2024",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching profile data.");
    }
  }
);
const violationSlice = createSlice({
  name: "home",
  initialState: {
    violations: [],
    violationsCount: 0,
    profile: [],
    prevProfile: "",
    searchStore: "",
    showViolations: false,
    isLoading: false,
    profileLength: 0,
    error: null,
    image: "",
    refresh: false,
  },
  reducers: {
    searchState: (state, action) => {
      state.searchStore = action.payload;
      state.prevProfile = action.payload;
    },
    profileStore: (state, action) => {
      state.profile = action.payload;
      state.profileLength = action.payload;
    },
    showViolationsPage: (state, action) => {
      state.showViolations = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
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
        state.violationsCount = action.payload.length || 0;
      })
      .addCase(fetchViolations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        const isStaff = action.payload.role === "staff";
        state.image = isStaff
          ? `https://gstaff.gitam.edu/img1.aspx?empid=${state.searchStore}`
          : `https://doeresults.gitam.edu/photo/img.aspx?id=${state.searchStore}`;
        state.profileLength = action.payload.stdprofile?.length || 0;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { searchState, profileStore, showViolationsPage, setRefresh } =
  violationSlice.actions;
export default violationSlice.reducer;
