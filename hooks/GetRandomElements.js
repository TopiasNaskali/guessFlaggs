export const getRandomElements = (array, count) => {
  const copiedArray = array.slice();
  const randomElements = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * copiedArray.length);
    randomElements.push(copiedArray.splice(index, 1)[0]);
  }

  return randomElements;
};
