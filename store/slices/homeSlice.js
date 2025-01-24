import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchViolations } from "./violationSlice";
import { fetchGatepassByID } from "./gatePassSlice";
export const fetchCardById = createAsyncThunk(
  "home/fetchCardById",
  async (searchQuery, { dispatch, rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("searchQuery", searchQuery);
      const response = await fetch(
        `http://172.17.58.151:9000/api/global/getCardsByID?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data by search query.");
      }
      const sdata = await response.json();
      const { data, source } = sdata;
      if (source === "Violations") {
        const result = await dispatch(fetchViolations(searchQuery)).unwrap();
        return { source, data: result };
      }
      if (source === "GatePass") {
        const result = await dispatch(fetchGatepassByID(searchQuery)).unwrap();
        return { source, data: result };
      }
      throw new Error("Invalid source or unsupported operation.");
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
    profile: [],
    cardData: [],
    isLoading: false,
    error: null,
    image: "",
    refresh: false,
    cardType: "",
  },
  reducers: {
    searchState: (state, action) => {
      state.searchStore = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setCardType: (state, action) => {
      state.cardType = action.payload;
    },
    clearState: (state) => {
      state.searchStore = "";
      state.profile = [];
      state.cardData = [];
      state.cardType = "";
      state.isLoading = false;
      state.error = null;
      state.image = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cardData = action.payload.data;
        state.cardType = action.payload.source;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { searchState, setRefresh, clearState, setCardType } =
  homeSlice.actions;
export default homeSlice.reducer;
