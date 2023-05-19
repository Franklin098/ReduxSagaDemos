function* create3To4Counter() {
  yield "Hi step 3";
  yield "Hi step 4";
}

function* createCounter() {
  yield "Hi step 1";
  yield "Hi step 2";
  yield* create3To4Counter();
  yield "Hi step 5";
}

const counter = createCounter();

for (let message of counter) {
  console.log(message);
}
