function* CreateHello() {
  try {
    const word = yield; // read from the outside world
    console.log("word: ", word);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

const hello = CreateHello();

console.log(hello.next());

// Simulate Error
hello.throw("My Fatal Error"); // Stop execution

console.log(hello.next("Max"));
