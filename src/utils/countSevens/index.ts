function countSevens(n: number) {
  let count = 0;

  for (let i = 1; i <= n; i++) {
    if (i.toString().includes('7')) {
      count++;
    }
  }
  return count;
}

export default countSevens;
