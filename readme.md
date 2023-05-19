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

- When there is an asynchronous action, the flow is different:

User interface [Click on a Button] --- (dispatch an Action) ---> Middleware ---> (dispatch 1 or multiple actions: start, loading, failed and success cases) ---> Reducer ---> Store ---> Show result in User interface

THe middleware captures the action and dispatch actions to reducer to update the state, if you are doing an API call, probably you have states for: start, loading, failed and success cases.

Remember that Redux saga is just a Redux middleware.
