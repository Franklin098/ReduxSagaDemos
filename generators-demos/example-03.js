// Generators allows you to throw information from the function to the outside world
// but it also allows you to do it in the other way.

function* CreateHello() {
  const word = yield; // read from the outside world
  console.log(word);
}

const hello = CreateHello();

console.log(hello.next()); // {value: undefined, done: false}

console.log(hello.next("Max")); // "Max" \n {value: undefined, done: true}
