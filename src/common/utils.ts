export const mapByProperty = <A, P extends keyof A>(array: A[], property: P): { [key: string]: A } => {
  const map: { [key: string]: A } = {};
  array.forEach((obj) => {
    const key = obj[property];
    map[key as any] = obj;
  });
  return map;
}

export const flatArray = <T>(arr: T[]) => arr.reduce((acc, val) => acc.concat(val), [] as T[])
