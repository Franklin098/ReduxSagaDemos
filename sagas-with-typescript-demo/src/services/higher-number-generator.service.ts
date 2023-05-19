// simulate a call to a backend service

let initialNumber = 1000;

export const generateHigherNumberSvc = (): Promise<number> => {
  const promise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      initialNumber += 1;
      resolve(initialNumber);
    }, 3000);
  });

  return promise;
};
