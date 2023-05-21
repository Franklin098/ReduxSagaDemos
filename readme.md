# What is Redux-Saga?

From the Docs:

Is a library that aims to make applications side effects (e.g: asynchronous things like data fetching and impure thinks like accessing browser cache) easier to manage, more efficient to execute, simple to test and better at handling failures.

## What is a Saga?

Mental model: Think that a saga is like a separate thread in your application that's solely responsible for side effects.

Redux-Saga is a redux middleware, this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

## Generator Functions

Redux-Saga uses an ES6 feature called Generator Functions to make those asynchronous flows easy to read, write and test.

By doing so, these asynchronous flows look like your standard synchronous JavaScript code. But generators have a few more awesome features that makes them a perfect fit for managing asynchronous flows.

Generator are functions that can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.

When we have asynchronous tasks we have a lot of jumps in the code, the idea of generators is to write everything in a linear way.

```javascript
function* CreateHello() {
  console.log("before yield");
  yield "first";
  console.log("after yield");
}

const logger = CreateHello();

console.log(logger.next()); // prints :

// "before yield"
// {value: "first", done: false}

// done: false -> means that the function has not been completed

console.log(logger.next()); // prints :

// "after yield"
// {value: undefined, done: true}
```

## Middleware

A middleware intercepts actions, it help us with asynchronous actions, remember that redux is synchronous by nature.

# Normal Flow

User interface [Click on a Button] --- (dispatch an Action) ---> Reducer ---> Store ---> Show result in User interface

# Asynchronous Flow

- When there is an asynchronous action, the flow is different:

User interface [Click on a Button] --- (dispatch an Action) ---> Middleware ---> (dispatch 1 or multiple actions: start, loading, failed and success cases) ---> Reducer ---> Store ---> Show result in User interface

THe middleware captures the action and dispatch actions to reducer to update the state, if you are doing an API call, probably you have states for: start, loading, failed and success cases.

Remember that Redux saga is just a Redux middleware.

# Common Sagas Effects

- takeEvery: allows to listen to every action of a specific type that we pass to it. We intercept the action.
- call: call to a function, usually an API call.
- put: launch/dispatch an action.
- all: executes multiple effects in parallel. (similar to Promise.all)
- fork: performs a non-blocking call, to do some things in parallel.

An effect describes an instruction to the middleware, tells the middleware what to do.

# Redux Saga Features

At first Redux Saga might look complex and probably we'll need many steps to setup the project and our workflow, but after that doing complex things with asyncronous tasks will be easier.

- Example, simple API request:

```javascript
// watcher
export function* watchNewGeneratedNumberRequestStart() {
  // listen for all events of type  "numberCollection/getNumberRequestStarted"
  const startEventID: string = getNumberRequestStarted.type;

  yield takeEvery(startEventID, requestNewGeneratedNumber); // intercept the action
}

// worker
function* requestNewGeneratedNumber() {
  // API call
  const generatedNumber: number = yield call(generateNumber);
  // dispatch action to update the store with the new number
  yield put(getNumberRequestCompleted(generatedNumber));
}

// group all watchers in a single saga
export const rootSaga = function* root() {
  // all : group all the sagas
  // fork: run the saga in a separate thread, in parallel
  yield all([fork(watchNewGeneratedNumberRequestStart)]);
};
```

- Example, create an API request with a cancel option:

```javascript
interface RaceResult {
  generateNumber?: number;
  cancel?: any;
}

// watcher
export function* watchNewGeneratedNumberRequestStart() {
  // listen for all events of type  "numberCollection/getNumberRequestStarted"
  const startEventID: string = getNumberRequestStarted.type;

  yield takeEvery(startEventID, requestNewGeneratedNumber);
}

// worker
function* requestNewGeneratedNumber() {
  const cancelEventId: string = cancelOngoingNumberRequest.type;
  // race between these 2 actions see which one gets a result first, one of them will be undefined
  const result: RaceResult = yield race({
    generateNumber: call(generateNumber), // API call
    cancel: take(cancelEventId), // se if users dispatch Cancel action
  });

  if (!result.cancel && result.generateNumber) {
    yield put(getNumberRequestCompleted(result.generateNumber));
  }
}
```

- Example, create a Debounce effect, avoid multiple API calls for a period of time

```javascript
// watcher
export function* watchNewGeneratedNumberRequestStart() {
  // listen for all events of type  "numberCollection/getNumberRequestStarted"
  const startEventID: string = getNumberRequestStarted.type;

  yield throttle(5000, startEventID, requestNewGeneratedNumber); // get the latest API call (e.g. user clicks twice on a button)
}

// worker
function* requestNewGeneratedNumber() {
  // API call
  const generatedNumber: number = yield call(generateNumber);
  // dispatch action to update the store with the new number
  yield put(getNumberRequestCompleted(generatedNumber));
}
```

# Channels

Channels are a way to communicate between sagas, they are similar to event channels in Node.js.

# Redux Saga CheatSet

### “takeEvery”

Watches for every time a specific redux action was dispatch.

Use this when: you want to watch for EVERY time a specific redux action was dispatched.

Use case: getting/fetching a list of data from an API

```javascript
function* watchGetUsersRequest() {
  yield takeEvery(action.Types.GET_USERS_REQUEST, getUsers);
}
```

### “takeLatest”

Use it when there is a potential for a redux action to be dispatched multiple times in a short period and could initiate multiple instances of the same sage (e.g: user clicks a button many times).

With takeLatest you only take the latest currently running saga for the associated dispatched redux action.
Use case: when creating or updating a record.

If you have multiple components querying the same API endpoint, you probably want to take the latest call for that data.

```javascript
function* watchGetLoggedInUserRequest() {
  yield takeLatest(action.Types.GET_LOGGED_IN_USER_REQUEST, getLoggedInUser);
}
```

### Blocking saga with “take”

“Take” listens for a redux action to be dispatch, but then you don’t want to listen for the same action until the currently running saga has been completed.

It blocks the ability to watch other instances of the same action until the current action is completed.

Use case: deleting a user.

Another user case is when accepting multiple payments. Generally, you don’t want to accept multiple transactions simultaneously, you want to wait until the current transaction is completed before allowing the ability to process another payment.

Usually we use "take" effect with a "while" loop.

```javascript
function* watchDeleteUserRequest() {
  while (true) {
    const { userId } = yield take(action.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, { userId });
  }
}
```

￼

### “Call”

Use it when calling a function or a promise but you want to wait for that function to finish running before executing the next line of code.

Normally used with takeAll or take.

Example of a blocking flow:
￼

### “Put”

Used when you want to dispatch a redux action from within a redux saga.

Use case: any time you want to update the redux state.

### “Fork”

Forking puts each saga in a separate process.

```javascript
const quoteSagas = [fork(watchGetQuotesRequest), fork(watchDeleteQuoteRequest)];
```
