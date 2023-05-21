import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CurrencyData {
  id: string;
  currency: string;
  change: string;
}
export type NumberCollectionState = {
  list: number[];
  isLoading: boolean;
  isSocketConnected: boolean;
  currencyList: CurrencyData[];
};

export const numberCollectionReducer = createSlice({
  name: "numberCollection",
  initialState: {
    isLoading: false,
    list: [0],
    isSocketConnected: false,
    currencyList: [],
  } as NumberCollectionState,
  reducers: {
    getNumberRequestCompleted: (state, action: PayloadAction<number>) => {
      state.list.push(action.payload);
      state.isLoading = false;
    },
    getNumberRequestStarted: (state) => {
      state.isLoading = true;
    },
    startSocketSubscription: (state) => {
      state.isSocketConnected = true;
    },
    stopSocketSubscription: (state) => {
      state.isSocketConnected = false;
    },
    currencyUpdateReceived: (state, action: PayloadAction<CurrencyData>) => {
      state.currencyList.unshift(action.payload);
      state.currencyList = state.currencyList.slice(0, 3);
    },
  },
});

export default numberCollectionReducer.reducer;

export const {
  getNumberRequestCompleted,
  getNumberRequestStarted,
  startSocketSubscription,
  stopSocketSubscription,
  currencyUpdateReceived,
} = numberCollectionReducer.actions;
