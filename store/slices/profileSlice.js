import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (searchStore, { rejectWithValue }) => {
    console.log("searchStore: ", typeof searchStore);
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
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching profile data.");
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    searchStore: "",
    profile: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    profileSearchState: (state, action) => {
      state.searchStore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { profileSearchState } = profileSlice.actions;
export default profileSlice.reducer;
