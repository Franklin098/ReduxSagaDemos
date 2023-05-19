import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type NumberCollectionState = {
  list: number[];
  isLoading: boolean;
  goAhead: boolean;
};

export const numberCollectionReducer = createSlice({
  name: "numberCollection",
  initialState: {
    isLoading: false,
    list: [0],
    goAhead: false,
  } as NumberCollectionState,
  reducers: {
    getNumberRequestCompleted: (state, action: PayloadAction<number>) => {
      state.list.push(action.payload);
      state.isLoading = false;
    },
    getNumberRequestStarted: (state) => {
      state.isLoading = true;
    },
    cancelOngoingNumberRequest: (state) => {
      state.isLoading = false;
    },
    numberRequestConfirmation: (state, action: PayloadAction<boolean>) => {
      state.goAhead = action.payload;
    },
  },
});

export default numberCollectionReducer.reducer;

export const {
  getNumberRequestCompleted,
  getNumberRequestStarted,
  cancelOngoingNumberRequest,
  numberRequestConfirmation,
} = numberCollectionReducer.actions;
