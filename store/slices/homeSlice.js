import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URLS = {
  PROFILE: "https://studentmobileapi.gitam.edu/Logingym",
  SEARCH: "http://172.17.58.151:9000/global/getCardsByID",
};
const DEFAULT_ERROR_MESSAGE = "An error occurred while fetching data.";
const fetchAPI = async (
  url,
  options = {},
  errorMessage = DEFAULT_ERROR_MESSAGE
) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || errorMessage);
  }
};
export const fetchProfile = createAsyncThunk(
  "home/fetchProfile",
  async (searchStore, { rejectWithValue }) => {
    const body = JSON.stringify({
      UserName: searchStore,
      Password: "Ganesh@2024",
    });
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };
    const data = await fetchAPI(
      API_URLS.PROFILE,
      options,
      "Failed to fetch profile data."
    );
    return { source: "Violations", data };
  }
);
export const fetchDataBySearchQuery = createAsyncThunk(
  "home/fetchDataBySearchQuery",
  async (searchQuery, { rejectWithValue }) => {
    const queryParams = new URLSearchParams({ searchQuery });
    const url = `${API_URLS.SEARCH}?${queryParams.toString()}`;
    const sdata = await fetchAPI(
      url,
      {},
      "Failed to fetch data by search query."
    );
    const { data, source } = sdata;

    if (!source || !data) {
      throw new Error("Invalid API response.");
    }
    return { source, data };
  }
);
const initialState = {
  searchStore: "",
  profile: null,
  cardData: [],
  cardType: "Violations",
  isLoading: false,
  error: null,
  image: "",
  noProfile: false,
};
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    searchState: (state, action) => {
      state.searchStore = action.payload;
    },
    setCardType: (state, action) => {
      state.cardType = action.payload;
    },
    clearState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.isLoading = true;
      state.error = null;
      state.noProfile = false;
    };
    const handleRejected = (state, action) => {
      state.isLoading = false;
      state.noProfile = true;
      state.error = action.payload;
    };
    builder
      .addCase(fetchProfile.pending, handlePending)
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.data;
        const isStaff = action.payload.data.role === "staff";
        state.image = isStaff
          ? `https://gstaff.gitam.edu/img1.aspx?empid=${state.searchStore}`
          : `https://doeresults.gitam.edu/photo/img.aspx?id=${state.searchStore}`;
        state.cardType = "Violations";
      })
      .addCase(fetchProfile.rejected, handleRejected)
      .addCase(fetchDataBySearchQuery.pending, handlePending)
      .addCase(fetchDataBySearchQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cardData = action.payload.data;
        state.cardType = action.payload.source;
      })
      .addCase(fetchDataBySearchQuery.rejected, handleRejected);
  },
});
export const { searchState, clearState, setCardType } = homeSlice.actions;
export default homeSlice.reducer;
