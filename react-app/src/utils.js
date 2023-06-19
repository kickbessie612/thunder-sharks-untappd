export const sort = prop => (a, b) => {
  if (a[prop] < b[prop]) {
    return 1;
  } else if (b[prop] < a[prop]) {
    return -1;
  }
  return 0;
};
