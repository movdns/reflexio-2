import dayjs from "dayjs";

function getDayLeftInPercent(): number {
  let start, finish, midpoint, percent, elapsed;
  start = dayjs().startOf("d").unix();
  finish = dayjs().endOf("d").unix();
  midpoint = dayjs().unix();

  elapsed = midpoint - start;
  percent = (elapsed / (finish - start)) * 100;

  return Math.round(percent);
}

export default getDayLeftInPercent;
