export const mapByProperty = <A, P extends keyof A>(array: A[], property: P): { [key: string]: A } => {
  const map: { [key: string]: A } = {};
  array.forEach((obj) => {
    const key = obj[property];
    map[key as any] = obj;
  });
  return map;
};

export const flatArray = <T>(arr: T[]) => arr.reduce((acc, val) => acc.concat(val), [] as T[]);

export const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
