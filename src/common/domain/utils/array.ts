import { AnyObject } from '@common/domain/utils';

export const orderBy = <T>(array: T[], field: string): T[] => {
  if (!array || !array.length) {
    return [] as T[];
  }

  return array.sort((current: T | AnyObject, next: T | AnyObject) =>
    (current[String(field)] || '').localeCompare(next[String(field)] || ''),
  );
};

export const removeItem = <T>(array: T[], value: T | AnyObject): T[] =>
  array.filter((item) => item !== value);

export const removeObject = <T>(
  array: T[],
  key: string,
  value: T | AnyObject,
): T[] => {
  const mappedArray = array.map((el: AnyObject) => el[String(key)]);
  const index = mappedArray.indexOf(value);
  return index >= 0 ? array.splice(index, 1) : array;
};

export const deleteObjectFromArray = (object: any, array: any[]): any[] => {
  let count: number;
  let index: number;
  array.forEach((item) => {
    count = 0;
    Object.keys(object).forEach((key) => {
      if (object[String(key)] === item[String(key)]) {
        count++;
      }

      if (count === Object.keys(object).length) {
        index = array.indexOf(item);
        if (index !== -1) {
          array.splice(index, 1);
        }
      }
    });
  });
  return array;
};

export const chunk = (array: any[], size: number) => {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
};
