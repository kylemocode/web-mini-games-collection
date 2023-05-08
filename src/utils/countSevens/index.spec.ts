import countSevens from '@/utils/countSevens';

describe('countSevens util function', () => {
  it('should return 0 when n is 0', () => {
    expect(countSevens(0)).toBe(0);
  });

  it('should return 1 when n is 7', () => {
    expect(countSevens(7)).toBe(1);
  });

  it('should return 0 when n is a positive integer without 7', () => {
    expect(countSevens(5)).toBe(0);
  });

  it('should return the correct count of sevens within a specific range', () => {
    expect(countSevens(30)).toBe(3);
    expect(countSevens(50)).toBe(5);
    expect(countSevens(100)).toBe(19);
    expect(countSevens(1000)).toBe(271);
  });
});
