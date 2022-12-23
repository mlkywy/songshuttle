const getRandomElements = (arr, n) => {
  let copiedArray = arr.slice(0);
  let randomElements = [];

  while (randomElements.length < n) {
    let randomIndex = Math.floor(Math.random() * copiedArray.length);
    let randomElement = copiedArray[randomIndex];
    randomElements.push(randomElement);
    copiedArray.splice(randomIndex, 1);
  }

  return randomElements;
};

export default getRandomElements;
