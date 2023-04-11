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
      if (response.data.message === "유기동물 검색 결과가 없습니다.") {
        return thunkAPI.fulfillWithValue(response.data.message);
      } else {
        return thunkAPI.fulfillWithValue(response.data.data);
      }
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
      if (response.data.message === "유기동물 검색 결과가 없습니다.") {
        return thunkAPI.fulfillWithValue(response.data.message);
      } else {
        return thunkAPI.fulfillWithValue(response.data.data);
      }
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
  publicSearchMode: false,
  postSearchMode: false,
  searchPublicState: false,
  searchPostState: false,
  searchPublicSetState: false,
  searchPostSetState: false,
  inputState: false,
  distanceState: false,
  searchPage: 1,
  responseMessage: "",
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
    togglePublicSearchState: (state) => {
      state.searchPublicState = !state.searchPublicState;
    },
    togglePostSearchState: (state) => {
      state.searchPostState = !state.searchPostState;
    },
    toggleSearchPublicSetState: (state, action) => {
      state.searchPublicSetState = action.payload;
    },
    toggleSearchPostSetState: (state, action) => {
      state.searchPostSetState = action.payload;
    },
    toggleInputState: (state, action) => {
      state.inputState = action.payload;
    },
    toggleDistanceState: (state, action) => {
      state.distanceState = action.payload;
    },
    togglePublicSearchMode: (state, action) => {
      state.publicSearchMode = action.payload;
    },
    togglePostSearchMode: (state, action) => {
      state.postSearchMode = action.payload;
    },
    setPostType: (state, action) => {
      state.postType = action.payload;
    },
    setMemberPosition: (state, action) => {
      state.longitude = action.payload.lng;
      state.latitude = action.payload.lat;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    resetSearchState: (state) => {
      return initialState;
    },
    resetKindValue: (state) => {
      state.kindCategory = "";
    },
    resetResponseMessage: (state) => {
      state.responseMessage = "";
    },
    completeSearch: (state) => {
      state.searchPage = 2;
      state.publicSearchLists = [];
      state.postSearchLists = [];
    },
    publicScrap: (state, action) => {
      const index = state.publicSearchLists.findIndex(
        (item) => item.desertionNo === action.payload.desertionNo.toString()
      );
      console.log(index);
      const updateListsItem = {
        ...state.publicSearchLists[index],
        isScrap: !action.payload.state,
      };
      state.publicSearchLists[index] = updateListsItem;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getAdoptionSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getAdoptionSearch.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.responseMessage = action.payload;
        } else if (typeof action.payload === "object") {
          state.publicSearchLists = [
            ...state.publicSearchLists,
            ...action.payload,
          ];
          state.searchPage = state.searchPage + 1;
        }
      })
      .addCase(__getAdoptionSearch.rejected, (state) => {
        state.error = true;
      });

    builder.addCase(__getPostSearch.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        state.responseMessage = action.payload;
      } else if (typeof action.payload === "object") {
        state.postSearchLists = [...state.postSearchLists, ...action.payload];
        state.searchPage = state.searchPage + 1;
      }
    });
  },
});

export const {
  toggleSearchCategory,
  toggleDescriptionCategory,
  toggleKindCategory,
  togglePublicSearchState,
  togglePostSearchState,
  toggleSearchPublicSetState,
  toggleSearchPostSetState,
  toggleInputState,
  toggleDistanceState,
  togglePublicSearchMode,
  setPostType,
  setMemberPosition,
  setSearchValue,
  resetSearchState,
  resetKindValue,
  resetResponseMessage,
  completeSearch,
  publicScrap,
} = searchSlice.actions;
export default searchSlice.reducer;
