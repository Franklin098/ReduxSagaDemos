import { Action } from "redux";
import { EventChannel, Task, eventChannel } from "redux-saga";
import { all, call, cancel, fork, put, take } from "redux-saga/effects";
import * as ioClient from "socket.io-client";
import {
  CurrencyData,
  currencyUpdateReceived,
  startSocketSubscription,
  stopSocketSubscription,
} from "../reducers/number-collection.reducer";

interface SocketResult {
  socket?: SocketIOClient.Socket;
  error?: Error;
}

function connect(): Promise<SocketResult> {
  const socket = ioClient.connect("http://localhost:1337");
  // wrap a socket event into a promise
  return new Promise<SocketResult>((resolve, reject) => {
    socket.on("connect", () => {
      socket.emit("messages");
      resolve({ socket });
    });

    socket.on("connect_error", (err: Error) => {
      console.log("connect failed: ", err);
      reject(new Error("ws connection error"));
    });
  }).catch((error) => ({ socket, error }));
}

function subscribe(socket: SocketIOClient.Socket) {
  // redux-saga eventChannels help to communicate between sagas.
  return eventChannel((emit) => {
    socket.on("currency", (message: CurrencyData) => {
      console.log("[message] currency: ", message);
      emit(currencyUpdateReceived(message));
    });

    socket.on("disconnect", (message: any) => {});

    socket.on("error", (message: any) => {
      console.log("Error while trying to connect");
    });

    return () => {};
  });
}

function* read(socket: SocketIOClient.Socket) {
  console.log("read function()");
  const channel: EventChannel<any> = yield call(subscribe, socket);

  // blocking watcher
  while (true) {
    console.log("take(channel)");
    // receive the messages from the channel
    let action: Action<any> = yield take(channel);
    console.log("action: ", action);
    // dispatch action, send to the reducer
    yield put(action);
  }
}

function* handleIO(socket: SocketIOClient.Socket) {
  yield fork(read, socket);
}

function* flow() {
  while (true) {
    // watch for the action to be dispatched
    yield take(startSocketSubscription.type); // blocks until current flow is completed
    // after the actions has been dispatched
    const { socket, error }: SocketResult = yield call(connect);
    if (socket) {
      console.log("connection worked: ", socket);
      const ioTask: Task<any> = yield fork(handleIO, socket); // starts new process in parallel to read from socket

      // wait for the action to stop the socket connection
      yield take(stopSocketSubscription.type);
      yield cancel(ioTask);
      socket.disconnect();
    } else {
      console.log("connection failed: ", error);
    }
  }
}

export function* socketRootSaga() {
  yield all([fork(flow)]);
}
