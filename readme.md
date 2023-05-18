# What is Redux-Saga?

From the Docs:

Is a library that aims to make applications side effects (e.g: asynchronous things like data fetching and impure thinks like accessing browser cache) easier to manage, more efficient to execute, simple to test and better at handling failures.

## What is a Saga?

Mental model: Think that a saga is like a separate thread in your application that's solely responsible for side effects.

Redux-Saga is a redux middleware, this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

## Generator Functions

Redux-Saga uses an ES6 feature called Generator Functions to make those asynchronous flows easy to read, write and test.

By doing so, these asynchronous flows look like your standard synchronous JavaScript code. But generators have a few more awesome features that makes them a perfect fit for managing asynchronous flows.
