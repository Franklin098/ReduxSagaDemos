// watch for actions

import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  getNumberRequestCompleted,
  getNumberRequestStarted,
} from "../reducers/number-collection.reducer";
import { generateNumber } from "../services";
import { socketRootSaga } from "./socket";

// watcher
export function* watchNewGeneratedNumberRequestStart() {
  // listen for all events of type  "numberCollection/getNumberRequestStarted"
  const startEventID: string = getNumberRequestStarted.type;

  yield takeEvery(startEventID, requestNewGeneratedNumber);
}

// worker
function* requestNewGeneratedNumber() {
  const result: number = yield call(generateNumber);
  yield put(getNumberRequestCompleted(result));
}

// group all watchers in a single saga
export const rootSaga = function* root() {
  // all : group all the sagas
  // fork: run the saga in a separate thread, in parallel
  yield all([fork(watchNewGeneratedNumberRequestStart), fork(socketRootSaga)]);
};
