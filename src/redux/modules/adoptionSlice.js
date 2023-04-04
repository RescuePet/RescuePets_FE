import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { home, instance } from "../../utils/api";

// Get adoption list
export const __getAdoptionList = createAsyncThunk(
  "getAdoptionList",
  async (payload, thunkAPI) => {
    try {
      console.log("hihi");
      const response = await home.get(
        `/api/pets/info-list?page=${payload.page}&size=${payload.size}&sortBy=happenDt`
      );
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// Get adoption Detail
export const __getAdoptionDetail = createAsyncThunk(
  "getAdoptionDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await home.get(`/api/pets/details/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// Adoption Scrap
export const __postAdoptionListScrap = createAsyncThunk(
  "postAdoptionScrap",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      let data = {
        page: payload.page,
        boolean: null,
        desertionNo: payload.desertionNo,
      };
      if (!payload.state) {
        await instance.post(`/api/scrap/petinfo/${payload.desertionNo}`);
        data.boolean = true;
        return thunkAPI.fulfillWithValue(data);
      } else if (payload.state) {
        await instance.delete(`/api/scrap/petinfo/${payload.desertionNo}`);
        data.boolean = false;
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  }
);

// Adoption inquiry
export const __postAdoptionInquiry = createAsyncThunk(
  "postAdoptionInquiry",
  async (payload, thunkAPI) => {
    try {
      await instance.post(`/api/pets/inquiry/${payload}`);
      return thunkAPI.fulfillWithValue(1);
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

const initialState = {
  error: false,
  loading: false,
  adoptionLists: [],
  adoptionDetail: {},
  adoptionPage: 1,
};

export const adoptionSlice = createSlice({
  name: "adoption",
  initialState,
  reducers: {
    addAdoptionPage: (state) => {
      state.adoptionPage = state.adoptionPage + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getAdoptionList.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getAdoptionList.fulfilled, (state, action) => {
        state.loading = false;
        state.adoptionLists = [
          ...state.adoptionLists,
          ...action.payload.publicPetResponseDto,
        ];
      })
      .addCase(__getAdoptionList.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(__getAdoptionDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(__getAdoptionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.adoptionDetail = action.payload;
      })
      .addCase(__getAdoptionDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(__postAdoptionListScrap.fulfilled, (state, action) => {
        const index = state.adoptionLists.findIndex(
          (item) => item.desertionNo === action.payload.desertionNo.toString()
        );
        if (action.payload.page === "home") {
          const updateListsItem = {
            ...state.adoptionLists[index],
            isScrap: action.payload.boolean,
          };
          state.adoptionLists[index] = updateListsItem;
        } else if (action.payload.page === "adoptiondetail") {
          let updateDetailItem;
          if (action.payload.boolean) {
            updateDetailItem = {
              ...state.adoptionDetail,
              isScrap: action.payload.boolean,
              scrapCount: state.adoptionDetail.scrapCount + 1,
            };
          } else {
            updateDetailItem = {
              ...state.adoptionDetail,
              isScrap: action.payload.boolean,
              scrapCount: state.adoptionDetail.scrapCount - 1,
            };
          }
          const updateListsItem = {
            ...state.adoptionLists[index],
            isScrap: action.payload.boolean,
          };

          state.adoptionDetail = updateDetailItem;
          state.adoptionLists[index] = updateListsItem;
        }
      })
      .addCase(__postAdoptionListScrap.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(__postAdoptionInquiry.fulfilled, (state, action) => {
        state.adoptionDetail.inquiryCount =
          state.adoptionDetail.inquiryCount + action.payload;
      })
      .addCase(__postAdoptionInquiry.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { addAdoptionPage } = adoptionSlice.actions;
export default adoptionSlice.reducer;
