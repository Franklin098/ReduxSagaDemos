import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import NumberCollectionReducer from "./number-collection.reducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  numberCollection: NumberCollectionReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(sagaMiddleware);
    },
  });
}

export const store = setupStore();

// start sagas. These functions are not running always in a thread, they are step functions, that are
// executed when an action is dispatched only
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
