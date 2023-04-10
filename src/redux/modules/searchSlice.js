import { home, instance } from "../../utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get Adoption Search Result
export const __getAdoptionSearch = createAsyncThunk(
  "getAdoptionSearch",
  async (payload, thunkAPI) => {
    const newPayload = {
      ...payload,
    };

    if (newPayload.description === "") {
      newPayload.latitude = "";
      newPayload.longitude = "";
    }
    if (newPayload.searchKey === "kindType") {
      newPayload.searchKey = "kindCd";
    }
    if (newPayload.type === "public") {
      if (newPayload.searchValue === "DOG") {
        newPayload.searchValue = "개";
      } else if (newPayload.searchValue === "CAT") {
        newPayload.searchValue = "고양이";
      } else if (newPayload.searchValue === "ETC") {
        newPayload.searchValue = "기타축종";
      }
    }

    try {
      const response = await home.get(
        `api/pets/search?page=${newPayload.page}&size=${newPayload.size}&memberLongitude=${newPayload.longitude}&memberLatitude=${newPayload.latitude}&description=${newPayload.description}&searchKey=${newPayload.searchKey}&searchValue=${newPayload.searchValue}`
      );
      console.log("getPublicSearch", response);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Get Post Search Result
export const __getPostSearch = createAsyncThunk(
  "getPostSearch",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(
        `api/post/search?page=${payload.page}&size=${payload.size}`
      );
      console.log("getPostSearch", response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  error: false,
  searchLists: [],
  searchState: false,
  searchSetState: false,
  inputState: false,
  searchPage: 1,
  longitude: "126.934086",
  latitude: "37.515133",
  searchValue: "",
  searchCategory: "none",
  descriptionCategory: "",
  kindCategory: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    toggleSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
    toggleDescriptionCategory: (state, action) => {
      state.descriptionCategory = action.payload;
    },
    toggleKindCategory: (state, action) => {
      state.kindCategory = action.payload;
    },
    toggleSearchState: (state) => {
      state.searchState = !state.searchState;
    },
    toggleSearchSetState: (state, action) => {
      state.searchSetState = action.payload;
    },
    toggleInputState: (state, action) => {
      state.inputState = action.payload;
    },
    setMemberPosition: (state, action) => {
      state.longitude = action.payload.lng;
      state.latitude = action.payload.lat;
    },
    setSearchValue: (state, action) => {
      console.log(action.payload);
      state.searchValue = action.payload;
    },
    resetSearchState: (state) => {
      return initialState;
    },
    resetKindValue: (state) => {
      state.kindCategory = "";
    },
    completeSearch: (state) => {
      state.searchPage = 2;
      state.searchLists = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getAdoptionSearch.fulfilled, (state, action) => {
      state.searchLists = [...state.searchLists, ...action.payload];
      state.searchPage = state.searchPage + 1;
    });
  },
});

export const {
  toggleSearchCategory,
  toggleDescriptionCategory,
  toggleKindCategory,
  toggleSearchState,
  toggleSearchSetState,
  toggleInputState,
  setMemberPosition,
  setSearchValue,
  resetSearchState,
  resetKindValue,
  completeSearch,
} = searchSlice.actions;
export default searchSlice.reducer;
