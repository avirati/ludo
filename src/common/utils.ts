export const mapByProperty = <A, P extends keyof A>(array: A[], property: P): Map<P, A> => {
  const map = new Map();
  array.forEach((obj) => map.set(obj[property], obj));
  return map;
}

export const flatArray = <T>(arr: T[]) => arr.reduce((acc, val) => acc.concat(val), [] as T[])
