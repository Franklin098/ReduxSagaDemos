// watch for actions

import {
  all,
  call,
  fork,
  put,
  race,
  take,
  takeEvery,
  throttle, //  avoid duplicate API calls (e.g. user clicks twice on a button)
  takeLatest, // get the latest API call (e.g. user clicks twice on a button)
} from "redux-saga/effects";
import {
  cancelOngoingNumberRequest,
  numberRequestConfirmation,
  getNumberRequestCompleted,
  getNumberRequestStarted,
} from "../reducers/number-collection.reducer";
import { generateHigherNumberSvc, generateNumber } from "../services";
import { PayloadAction } from "@reduxjs/toolkit";

interface RaceResult {
  generateNumber?: number;
  cancel?: any;
}

interface AllResult {
  generatedNumber: number;
  generatedHigherNumber: number;
}

// watcher
export function* watchNewGeneratedNumberRequestStart() {
  // listen for all events of type  "numberCollection/getNumberRequestStarted"
  const startEventID: string = getNumberRequestStarted.type;

  yield takeEvery(startEventID, requestNewGeneratedNumber);
  //yield takeLatest(startEventID, requestNewGeneratedNumber); // get the latest API call (e.g. user clicks twice on a button)
  // yield throttle(5000, startEventID, requestNewGeneratedNumber); // get the latest API call (e.g. user clicks twice on a button)
}

// worker
function* requestNewGeneratedNumber() {
  const confirmEventID: string = numberRequestConfirmation.type;
  const confirmationResult: PayloadAction<boolean> = yield take(confirmEventID); // the saga waits until the user confirms the request

  if (confirmationResult.payload) {
    const result: number = yield call(generateNumber);
    yield put(getNumberRequestCompleted(result));
  }
}

// group all watchers in a single saga
export const rootSaga = function* root() {
  // all : group all the sagas
  // fork: run the saga in a separate thread, in parallel
  yield all([fork(watchNewGeneratedNumberRequestStart)]);
};
