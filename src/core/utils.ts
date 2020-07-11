export const randomFromArr = <T>(arr: T[]) => {
  const min = 0;
  const max = arr.length - 1;
  const rnd = Math.floor(min + Math.random() * (max + 1 - min));

  return arr[rnd];
};
