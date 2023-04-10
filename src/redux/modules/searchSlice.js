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
    } else if (newPayload.searchKey === "distance") {
      newPayload.searchKey = "";
      newPayload.searchValue = "";
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
    const newPayload = {
      ...payload,
    };
    if (newPayload.description === "") {
      newPayload.latitude = "";
      newPayload.longitude = "";
    }
    if (newPayload.searchKey === "kindType") {
      newPayload.searchKey = "upkind";
    } else if (newPayload.searchKey === "distance") {
      newPayload.searchKey = "";
      newPayload.searchValue = "";
    }
    try {
      const response = await instance.get(
        `api/post/search?page=${newPayload.page}&size=${newPayload.size}&postType=${newPayload.postType}&memberLongitude=${newPayload.longitude}&memberLatitude=${newPayload.latitude}&description=${newPayload.description}&searchKey=${newPayload.searchKey}&searchValue=${newPayload.searchValue}`
      );
      console.log("getPostSearch", response);
      if (response.data.data.length === 0) {
        return thunkAPI.rejectWithValue("nonepost");
      }
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  error: false,
  publicSearchLists: [],
  postSearchLists: [],
  searchState: false,
  searchSetState: false,
  inputState: false,
  distanceState: false,
  searchPage: 1,
  postType: "MISSING",
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
    toggleDistanceState: (state, action) => {
      state.distanceState = action.payload;
    },
    setPostType: (state, action) => {
      state.postType = action.payload;
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
      state.publicSearchLists = [];
      state.postSearchLists = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getAdoptionSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getAdoptionSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.publicSearchLists = [
          ...state.publicSearchLists,
          ...action.payload,
        ];
        state.searchPage = state.searchPage + 1;
      })
      .addCase(__getAdoptionSearch.rejected, (state) => {
        state.error = true;
      });

    builder.addCase(__getPostSearch.fulfilled, (state, action) => {
      state.postSearchLists = [...state.postSearchLists, ...action.payload];
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
  toggleDistanceState,
  setPostType,
  setMemberPosition,
  setSearchValue,
  resetSearchState,
  resetKindValue,
  completeSearch,
} = searchSlice.actions;
export default searchSlice.reducer;