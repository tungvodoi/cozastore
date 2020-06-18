let count = 0;
let hello = (items) => {
  items.forEach(async (item) => {
    // await someAPICall();
    count++;
  });
  console.log(count);
};
someAPICall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, 1000);
  });
};
hello(['1', '2', '3', '4']);
