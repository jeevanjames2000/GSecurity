import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchProfile = createAsyncThunk(
  "home/fetchProfile",
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
      return { source: "Violations", data };
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching profile data.");
    }
  }
);
export const fetchDataBySearchQuery = createAsyncThunk(
  "home/fetchDataBySearchQuery",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("searchQuery", searchQuery);
      const response = await fetch(
        `http://172.17.58.151:9000/global/getCardsByID?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data by search query.");
      }
      const sdata = await response.json();
      const { data, source } = sdata;
      if (!source || !data) {
        throw new Error("Invalid API response.");
      }
      return { source, data };
    } catch (error) {
      return rejectWithValue(
        error.message || "Error fetching data by search query."
      );
    }
  }
);
const homeSlice = createSlice({
  name: "home",
  initialState: {
    searchStore: "",
    profile: null,
    cardData: [],
    cardType: "Violations",
    isLoading: false,
    error: null,
    image: "",
    noProfile: false,
  },
  reducers: {
    searchState: (state, action) => {
      state.searchStore = action.payload;
    },
    setCardType: (state, action) => {
      state.cardType = action.payload;
    },
    clearState: (state) => {
      state.searchStore = "";
      state.profile = null;
      state.cardData = [];
      state.cardType = "";
      state.isLoading = false;
      state.error = null;
      state.image = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.noProfile = false;
        state.error = null;
        state.profile = null;
        state.image = "";
        state.cardType = "Violations";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.data;
        const isStaff = action.payload.data.role === "staff";
        state.image = isStaff
          ? `https://gstaff.gitam.edu/img1.aspx?empid=${state.searchStore}`
          : `https://doeresults.gitam.edu/photo/img.aspx?id=${state.searchStore}`;
        state.cardType = "Violations";
        state.noProfile = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.noProfile = true;
        state.error = action.payload;
        state.profile = null;
        state.cardData = [];
        state.image = "";
        state.cardType = "Violations";
      })
      .addCase(fetchDataBySearchQuery.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.noProfile = false;
        state.cardData = [];
      })
      .addCase(fetchDataBySearchQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.noProfile = false;
        state.cardData = action.payload.data;
        state.cardType = action.payload.source;
      })
      .addCase(fetchDataBySearchQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.noProfile = true;
        state.error = action.payload;
      });
  },
});
export const { searchState, clearState, setCardType } = homeSlice.actions;
export default homeSlice.reducer;
