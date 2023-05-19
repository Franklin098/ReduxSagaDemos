// simulate a call to a backend service

let initialNumber = 0;

export const generateNumber = (): Promise<number> => {
  const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      initialNumber += 1;
      resolve(initialNumber);
    }, 5000);
  });

  return promise;
};
