function* createLogger() {
  console.log("Start");
  yield;
  console.log("End");
}

const logger = createLogger();

logger.next(); // prints Start
logger.next(); // prints Next
