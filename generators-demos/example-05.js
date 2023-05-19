// Create a counter
function* createCounter() {
  yield "Hi step 1";
  yield "Hi step 2";
  yield "Hi step 3";
  yield "Hi step 4";
}

const counter = createCounter();

for (let message of counter) {
  console.log(message);
}
