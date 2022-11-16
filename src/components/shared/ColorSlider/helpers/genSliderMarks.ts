export function genSliderMarks(min: number, max: number, step?: number) {
  let arr = [];
  for (let i = min; i <= max; i += step || 1) {
    arr.push({ value: i });
  }

  return arr.slice(1, -1);
}
export default genSliderMarks;
