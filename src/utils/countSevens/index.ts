export const ERROR_IS_NOT_INTEGER = 'Input must be an integer';

function countSevens(n: number) {
  if (!Number.isInteger(n)) {
    throw new Error(ERROR_IS_NOT_INTEGER);
  }

  let count = 0;

  for (let i = 1; i <= n; i++) {
    if (i.toString().includes('7')) {
      count++;
    }
  }
  return count;
}

export default countSevens;
