function* create3To4Counter() {
  yield 3;
  return 4;
}

function* createCounter() {
  yield 1;
  yield 2;
  const four = yield* create3To4Counter();
  console.log(four);
  yield four + 1;
  return 6; // note that we don't print 6k
}

const counter = createCounter();

for (let message of counter) {
  console.log(message);
}
