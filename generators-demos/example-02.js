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
